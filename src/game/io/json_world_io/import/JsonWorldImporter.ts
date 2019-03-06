import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { SerializedMeshModel, WorldItem } from '../../../world_items/WorldItem';
import { World } from '../../../model/World';
import { AbstractWorldImporter } from '../../AbstractWorldImporter';
import { Player } from '../../../model/creature/type/Player';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { JsonWorldSchema, setDefaultsForJsonWorld } from './JsonWorldSchema';
import { LightController } from '../../../model/light/LightController';
import { Vector2Model } from '../../../model/utils/Vector2Model';


export class JsonWorldImporter extends AbstractWorldImporter<SerializedMeshModel> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<SerializedMeshModel>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {
        const jsonWorld = <JsonWorldSchema> JSON.parse(strWorld);
        setDefaultsForJsonWorld(jsonWorld);

        const world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = new Vector2Model(jsonWorld.dimensions.x, jsonWorld.dimensions.y);
        world.camera = this.camera;

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.setMeshes(jsonWorld.items, meshFactory, world);

                return world;
            });
    }

    protected setMeshes(serializedMeshModel: SerializedMeshModel[], meshFactory: MeshFactory<SerializedMeshModel>, world: World): void {
        const meshes = serializedMeshModel
            .map(item => this.createMesh(item, meshFactory, world));

        world.gameObjects = meshes.filter(mesh => mesh.name !== 'floor');
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }
}
