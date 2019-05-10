import { defaultParseOptions, GwmWorldItem, GwmWorldMapParser, parsers, transformators, TreeIteratorGenerator, TreeNode } from '@nightshifts.inc/world-generator';
import { Scene } from '@babylonjs/core';
import { Promise } from 'es6-promise';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { FlashlightToolMesh } from '../../tools/FlashlightToolMesh';
import { ThermometerToolMesh } from '../../tools/ThermometerToolMesh';
import { World } from '../World';
import { WorldFactory } from '../world_factory/WorldFactory';
import { WorldFactoryProducer } from '../world_factory/WorldFactoryProducer';
import { WorldItem } from '../world_items/WorldItem';
import { parseJsonAdditionalData } from './AdditionalData';
import { WorldItemTreeMapper } from './WorldItemTreeMapper';
import { WorldMapToMatrixGraphConverter } from '@nightshifts.inc/world-generator/build/matrix_graph/conversion/WorldMapToMatrixGraphConverter';
import { Player } from '../world_items/item_types/player/Player';

export class WorldImporter {
    private meshFactoryProducer: WorldFactoryProducer;
    private scene: Scene;

    constructor(scene: Scene, meshFactoryProducer: WorldFactoryProducer) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
    }

    private createWorld(rootWorldItem: GwmWorldItem, worldFactory: WorldFactory): World {
        let world = new World();

        world.scene = this.scene;
        world.dimensions = new Vector2Model(rootWorldItem.dimensions.width, rootWorldItem.dimensions.height);
        world.factory = worldFactory;

        world.worldItems = this.createWorldItems(rootWorldItem, world, worldFactory);

        world.tools = [
            new ThermometerToolMesh(this.scene, world.player),
            new FlashlightToolMesh(this.scene, world)
        ];

        return world;
    }

    private createWorldItems(rootWorldItem: GwmWorldItem, world: World, worldFactory: WorldFactory): WorldItem[] {
        const worldItemToTreeMapper = new WorldItemTreeMapper();

        const treeIterator = TreeIteratorGenerator(rootWorldItem as any);

        const worldItems: WorldItem[] = [];
        const map: Map<TreeNode, any> = new Map();
        for (const gwmWorldItem of treeIterator) {
            const worldItem = this.createWorldItem(gwmWorldItem, worldFactory, world);
            worldItems.push(worldItem);
            map.set(gwmWorldItem, worldItem);
        }

        worldItemToTreeMapper.mapTree(<any> rootWorldItem, map);

        world.floor = worldItems.filter(mesh => mesh.type === 'floor')[0];
        world.player = <Player> worldItems.filter(mesh => mesh.type === 'player')[0];

        return worldItems;
    }

    private createWorldItem(meshModelDescription: GwmWorldItem, meshFactory: WorldFactory, world: World): WorldItem {
        switch (meshModelDescription.name) {
            case 'wall':
                return meshFactory.createWall(meshModelDescription, world);
            case 'door':
                return meshFactory.createDoor(meshModelDescription, world);
            case 'window':
                return meshFactory.createWindow(meshModelDescription, world);
            case 'root':
                return meshFactory.createFloor(meshModelDescription, world);
            case 'player':
                return meshFactory.createPlayer(meshModelDescription, world);
            case 'bed':
                return meshFactory.createBed(<any> meshModelDescription, world);
            case 'table':
                return meshFactory.createTable(meshModelDescription, world);
            case 'cupboard':
                return meshFactory.createCupboard(meshModelDescription, world);
            case 'bathtub':
                return meshFactory.createBathtub(meshModelDescription, world);
            case 'washbasin':
                return meshFactory.createWashbasin(meshModelDescription, world);
            case 'room':
                return meshFactory.createRoom(meshModelDescription, world);
            case 'empty':
                return meshFactory.createEmptyArea(meshModelDescription, world);
            default:
                throw new Error('Unknown GameObject type: ' + meshModelDescription.name);
        }
    }

    public import(strWorld: string): Promise<World> {

        const options = {...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}};
        const furnitureCharacters = ['X', 'C', 'T', 'B', 'S', 'E'];
        const roomSeparatorCharacters = ['W', 'D', 'I'];

        const worldItems = GwmWorldMapParser.createWithCustomWorldItemGenerator(
            new parsers.CombinedWorldItemParser(
                [
                    new parsers.FurnitureInfoParser(furnitureCharacters, new WorldMapToMatrixGraphConverter()),
                    new parsers.RoomSeparatorParser(roomSeparatorCharacters),
                    new parsers.RoomInfoParser(),
                    new parsers.PolygonAreaInfoParser('empty', '#'),
                    new parsers.RootWorldItemParser()
                ]
            ),
            [

                new transformators.ScalingTransformator({ x: options.xScale, y: options.yScale }),
                new transformators.BorderItemSegmentingTransformator(
                    ['wall', 'door', 'window'],
                    { xScale: options.xScale, yScale: options.yScale }
                ),
                new transformators.HierarchyBuildingTransformator(),
                new transformators.BorderItemAddingTransformator(['wall', 'door', 'window']),
                new transformators.StretchRoomsSoTheyJoinTransformator({ xScale: options.xScale, yScale: options.yScale }),
                new transformators.AdditionalDataConvertingTransformator(options.additionalDataConverter)
            ]
        ).parse(strWorld);

        return this.meshFactoryProducer.getFactory(this.scene).then(worldFactory => this.createWorld(worldItems[0], worldFactory));
    }
}
