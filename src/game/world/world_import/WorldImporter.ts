import { defaultParseOptions, WorldItemInfo, parsers, transformators, TreeIteratorGenerator, TreeNode, WorldParser, WorldItemInfoFactory, BabylonConverter, BabylonImporter } from '@nightshifts.inc/world-generator';
import { Scene } from '@babylonjs/core';
import { Promise } from 'es6-promise';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { FlashlightTool } from '../../tools/FlashlightTool';
import { ThermometerTool } from '../../tools/ThermometerTool';
import { World } from '../World';
import { WorldFactory } from '../world_factory/WorldFactory';
import { WorldFactoryProducer } from '../world_factory/WorldFactoryProducer';
import { GameObject } from '../world_items/item_types/GameObject';
import { parseJsonAdditionalData } from './AdditionalData';
import { WorldItemTreeMapper } from './WorldItemTreeMapper';
import { WorldMapToMatrixGraphConverter } from '@nightshifts.inc/world-generator/build/src/matrix_graph/conversion/WorldMapToMatrixGraphConverter';
import { Line, Polygon } from '@nightshifts.inc/geometry';
import { Segment } from '@nightshifts.inc/geometry/build/shapes/Segment';
import { GameObjectFactory } from '../world_factory/GameObjectFactory';
import { Room } from '../world_items/item_types/Room';
import { Border } from '../world_items/item_types/Border';

export class WorldImporter {
    private meshFactoryProducer: WorldFactoryProducer;
    private scene: Scene;

    constructor(scene: Scene, meshFactoryProducer: WorldFactoryProducer) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
    }

    private createWorld(rootWorldItem: WorldItemInfo[], worldFactory: WorldFactory): World {
        let world = new World();

        world.scene = this.scene;
        world.dimensions = new Vector2Model(rootWorldItem[0].dimensions.getBoundingInfo().extent[0], rootWorldItem[0].dimensions.getBoundingInfo().extent[1]);
        world.factory = worldFactory;

        world.worldItems = this.createWorldItems(rootWorldItem, world, worldFactory);

        world.tools = [
            new ThermometerTool(this.scene, world.player),
            new FlashlightTool(this.scene, world)
        ];

        return world;
    }

    private createWorldItems(rootWorldItem: WorldItemInfo[], world: World, worldFactory: WorldFactory): GameObject[] {
        const gameObjects: GameObject[] = [];

        const gameObjectFactory = new GameObjectFactory();
        new BabylonConverter<GameObject>().convert(
            rootWorldItem,
            (worldItemInfo: WorldItemInfo) => {
                const gameObject = gameObjectFactory.getInstance(worldItemInfo);
                gameObjects.push(gameObject);
                return gameObject;
            },
            (parent: GameObject, children: GameObject[]) => {
                parent.children = children;
            },
            (item: GameObject, borders: GameObject[]) => {
                (<Room> item).borders = <Border[]> borders;
            });
        // const worldItemToTreeMapper = new WorldItemTreeMapper();

        // const treeIterator = TreeIteratorGenerator(rootWorldItem as any);

        // const worldItems: GameObject[] = [];
        // const map: Map<TreeNode, any> = new Map();
        // for (const gwmWorldItem of treeIterator) {
        //     if (!(gwmWorldItem.name === 'wall' && gwmWorldItem.dimensions instanceof Polygon)) {
        //         const worldItem = this.createWorldItem(gwmWorldItem, worldFactory, world);
        //         worldItems.push(worldItem);
        //         map.set(gwmWorldItem, worldItem);
        //     }
        // }

        // worldItemToTreeMapper.mapTree(<any> rootWorldItem, map);

        world.floor = gameObjects.filter(mesh => mesh.type === 'floor')[0];
        world.player = gameObjects.filter(mesh => mesh.type === 'player')[0];

        return gameObjects;
    }

    private createWorldItem(meshModelDescription: WorldItemInfo, meshFactory: WorldFactory, world: World): GameObject {
        switch (meshModelDescription.name) {
            case 'wall':
                return meshFactory.createWall(meshModelDescription, world);
            case 'door':
                const door = meshFactory.createDoor(meshModelDescription, world);
                return door;
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
            case 'chair':
                return meshFactory.createChair(meshModelDescription, world);
            case 'room':
                return meshFactory.createRoom(meshModelDescription, world);
            case 'empty':
                return meshFactory.createEmptyArea(meshModelDescription, world);
            case 'window':
                return meshFactory.createWindow(meshModelDescription, world);
            default:
                throw new Error('Unknown GameObject type: ' + meshModelDescription.name);
        }
    }

    public import(strWorld: string): Promise<World> {

        return <any> new BabylonImporter(this.scene as any)
            .import(
                strWorld,
                [
                    {
                        type: 'player',
                        model: 'file' as any,
                        fileDescription: {
                            path: 'models/player/',
                            fileName: 'player.babylon',
                            scale: 0.28
                        }
                    },
                    // {
                    //     type: 'wall',
                    //     model: 'file' as any,
                    //     fileDescription: {
                    //         path: '',
                    //         fileName: '',
                    //         scale: 1
                    //     }
                    // },
                    // {
                    //     type: 'room',
                    //     model: 'file' as any,
                    //     fileDescription: {
                    //         path: '',
                    //         fileName: '',
                    //         scale: 1
                    //     }
                    // },
                ]
            )
            .then(worldItemInfo => this.createWorld(worldItemInfo, null));

        // return this.meshFactoryProducer.getFactory(this.scene).then(worldFactory => {
        //     const options = {...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}};
        //     const furnitureCharacters = ['X', 'C', 'T', 'B', 'S', 'E', 'H'];
        //     const roomSeparatorCharacters = ['W', 'D', 'I'];

        //     const worldItemInfoFactory = new WorldItemInfoFactory();
        //     let worldItems = WorldParser.createWithCustomWorldItemGenerator(
        //         new parsers.CombinedWorldItemParser(
        //             [
        //                 new parsers.FurnitureInfoParser(worldItemInfoFactory, furnitureCharacters, new WorldMapToMatrixGraphConverter()),
        //                 new parsers.RoomSeparatorParser(worldItemInfoFactory, roomSeparatorCharacters),
        //                 new parsers.RoomInfoParser(worldItemInfoFactory),
        //                 new parsers.PolygonAreaInfoParser(worldItemInfoFactory, 'empty', '#'),
        //                 new parsers.RootWorldItemParser(worldItemInfoFactory)
        //             ]
        //         ),
        //         [

        //             new transformators.ScalingTransformator({ x: options.xScale, y: options.yScale }),
        //             new transformators.BorderItemSegmentingTransformator(
        //                 worldItemInfoFactory,
        //                 ['wall', 'door', 'window'],
        //                 { xScale: options.xScale, yScale: options.yScale }
        //             ),
        //             new transformators.HierarchyBuildingTransformator(),
        //             new transformators.BorderItemAddingTransformator(['wall', 'door', 'window']),
        //             new transformators.BorderItemsToLinesTransformator({ xScale: options.xScale, yScale: options.yScale }),
        //             new transformators.BorderItemWidthToRealWidthTransformator([{name: 'window', width: 2}, {name: 'door', width: 2.7}]),
        //             new transformators.FurnitureRealSizeTransformator(
        //                 {
        //                     cupboard: Polygon.createRectangle(0, 0, 2, 1.5),
        //                     bathtub: Polygon.createRectangle(0, 0, 4.199999999999999, 2.400004970948398),
        //                     washbasin: Polygon.createRectangle(0, 0, 2, 1.58 + 1.5),
        //                     table: Polygon.createRectangle(0, 0, 3.4, 1.4 + 1.5)

        //                 }
        //             ),
        //             new transformators.AdditionalDataConvertingTransformator(options.additionalDataConverter)
        //         ]
        //     ).parse(strWorld);

        //     return this.createWorld(worldItems[0], worldFactory);
        // });
    }
}
