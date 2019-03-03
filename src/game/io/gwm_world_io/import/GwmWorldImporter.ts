import { World } from '../../../model/World';
import { GwmWorldMapParser, GwmWorldItem } from 'game-worldmap-generator';
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

export class GwmWorldImporter extends AbstractWorldImporter<GwmWorldItem> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<GwmWorldItem>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {
        const worldItems = GwmWorldMapParser
            .createWithOptions<AdditionalData>({...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}})
            .parse(strWorld);

        const world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = this.getWorldDimensions(worldItems);
        world.camera = this.camera;

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.setMeshes(worldItems, meshFactory, world);

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

    private getWorldDimensions(gameObjects: GwmWorldItem[]): Vector2Model {
        const floor = gameObjects.filter(worldItem => worldItem.name === 'floor')[0];

        return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
    }
}
