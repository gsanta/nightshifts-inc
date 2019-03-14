import { World } from '../../../model/World';
import { GwmWorldMapParser, GwmWorldItem, TreeIteratorGenerator } from 'game-worldmap-generator';
import { Player } from '../../../model/creature/type/Player';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { AdditionalData, parseJsonAdditionalData } from './AdditionalData';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { LightController } from '../../../model/light/LightController';
import { AbstractWorldImporter } from '../../AbstractWorldImporter';
import { defaultParseOptions } from 'game-worldmap-generator/build/GwmWorldMapParser';
import { AdditionalDataConvertingWorldItemDecorator } from 'game-worldmap-generator/build/parsing/decorators/AdditionalDataConvertingWorldItemDecorator';
import { ScalingWorldItemGeneratorDecorator } from 'game-worldmap-generator/build/parsing/decorators/ScalingWorldItemGeneratorDecorator';
import { CombinedWorldItemGenerator } from 'game-worldmap-generator/build/parsing/decorators/CombinedWorldItemGenerator';
import { FurnitureInfoGenerator } from 'game-worldmap-generator/build/parsing/furniture_parsing/FurnitureInfoGenerator';
import { WorldMapToMatrixGraphConverter } from 'game-worldmap-generator/build/matrix_graph/conversion/WorldMapToMatrixGraphConverter';
import { RoomInfoGenerator } from 'game-worldmap-generator/build/parsing/room_parsing/RoomInfoGenerator';
import { BorderItemAddingWorldItemGeneratorDecorator } from 'game-worldmap-generator/build/parsing/decorators/BorderItemAddingWorldItemGeneratorDecorator';
import { HierarchyBuildingWorldItemGeneratorDecorator } from 'game-worldmap-generator/build/parsing/decorators/HierarchyBuildingWorldItemGeneratorDecorator';
import { RoomSeparatorGenerator } from 'game-worldmap-generator/build/parsing/room_separator_parsing/RoomSeparatorGenerator';
import { RootWorldItemGenerator } from 'game-worldmap-generator/build/parsing/RootWorldItemGenerator';
import { BorderItemSegmentingWorldItemGeneratorDecorator } from 'game-worldmap-generator/build/parsing/decorators/BorderItemSegmentingWorldItemGeneratorDecorator';

export class GwmWorldImporter extends AbstractWorldImporter<GwmWorldItem> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<GwmWorldItem>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {

        const options = {...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}};
        const furnitureCharacters = ['X', 'C', 'T', 'B', 'S', 'E'];
        const roomSeparatorCharacters = ['W', 'D', 'I'];

        const worldItems = GwmWorldMapParser.createWithCustomWorldItemGenerator(
            new AdditionalDataConvertingWorldItemDecorator(
                new BorderItemAddingWorldItemGeneratorDecorator(
                    new HierarchyBuildingWorldItemGeneratorDecorator(
                        new BorderItemSegmentingWorldItemGeneratorDecorator(
                            new ScalingWorldItemGeneratorDecorator(
                                new CombinedWorldItemGenerator(
                                    [
                                        new FurnitureInfoGenerator(furnitureCharacters, new WorldMapToMatrixGraphConverter()),
                                        new RoomSeparatorGenerator(roomSeparatorCharacters),
                                        new RoomInfoGenerator(),
                                        new RootWorldItemGenerator()
                                    ]
                                ),
                                { x: options.xScale, y: options.yScale }
                            ),
                            ['wall', 'door', 'window']
                        )
                    ),
                    ['wall', 'door', 'window']
                ),
                options.additionalDataConverter
            )
        )
        .parse(strWorld);


        let world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = new Vector2Model(worldItems[0].dimensions.width, worldItems[0].dimensions.height);
        world.camera = this.camera;

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.meshFactory = meshFactory;

                world = this.createWorld(worldItems[0], world);

                // world.rooms = [this.createRoom(rooms[0], world, meshFactory)];

                // world.rooms = rooms.map(polygon => this.createRoom(polygon, world, meshFactory));
                return world;
            });
    }

    protected setMeshes(worldItems: GwmWorldItem[], meshFactory: MeshFactory<GwmWorldItem>, world: World): void {
        const meshes = worldItems.map(worldItem => this.createMesh(worldItem, meshFactory, world));

        world.gameObjects = meshes;
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }
}
