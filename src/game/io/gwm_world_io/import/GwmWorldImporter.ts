import { World } from '../../../model/World';
import { GwmWorldMapParser, GwmWorldItem, TreeIteratorGenerator, generators } from 'game-worldmap-generator';
import { Player } from '../../../world_items/Player';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { AdditionalData, parseJsonAdditionalData } from './AdditionalData';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { LightController } from '../../../actions/handlers/LightController';
import { AbstractWorldImporter } from '../../AbstractWorldImporter';
import { defaultParseOptions } from 'game-worldmap-generator/build/GwmWorldMapParser';
import { WorldMapToMatrixGraphConverter } from 'game-worldmap-generator/build/matrix_graph/conversion/WorldMapToMatrixGraphConverter';

export class GwmWorldImporter extends AbstractWorldImporter<GwmWorldItem> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<GwmWorldItem>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {

        const options = {...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}};
        const furnitureCharacters = ['X', 'C', 'T', 'B', 'S', 'E'];
        const roomSeparatorCharacters = ['W', 'D', 'I'];

        const worldItems = GwmWorldMapParser.createWithCustomWorldItemGenerator(
            new generators.AdditionalDataConvertingWorldItemDecorator(
                new generators.StretchRoomsSoTheyJoinWorldItemGeneratorDecorator(
                    new generators.BorderItemAddingWorldItemGeneratorDecorator(
                        new generators.HierarchyBuildingWorldItemGeneratorDecorator(
                            new generators.BorderItemSegmentingWorldItemGeneratorDecorator(
                                new generators.ScalingWorldItemGeneratorDecorator(
                                    new generators.CombinedWorldItemGenerator(
                                        [
                                            new generators.FurnitureInfoGenerator(furnitureCharacters, new WorldMapToMatrixGraphConverter()),
                                            new generators.RoomSeparatorGenerator(roomSeparatorCharacters),
                                            new generators.RoomInfoGenerator(),
                                            new generators.RootWorldItemGenerator()
                                        ]
                                    ),
                                    { x: options.xScale, y: options.yScale }
                                ),
                                ['wall', 'door', 'window'],
                                { xScale: options.xScale, yScale: options.yScale }
                            )
                        ),
                        ['wall', 'door', 'window'],
                        { xScale: options.xScale, yScale: options.yScale }
                    ),
                    { xScale: options.xScale, yScale: options.yScale }
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
