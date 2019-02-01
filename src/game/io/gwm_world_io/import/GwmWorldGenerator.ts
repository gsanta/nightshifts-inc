import { World } from '../../../model/World';
import { GameObject, GameObjectParser } from 'game-worldmap-generator';
import { Player } from '../../../model/creature/type/Player';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { AdditionalData, parseJsonAdditionalData } from './AdditionalData';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { AbstractWorldGenerator } from '../../../model/core/factories/AbstractWorldGenerator';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { LightController } from '../../../model/light/LightController';

export class GwmWorldGenerator extends AbstractWorldGenerator<GameObject> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<GameObject>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {
        const gameObjects = <GameObject<AdditionalData>[]> new GameObjectParser().parse<AdditionalData>(strWorld, parseJsonAdditionalData);

        const world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = this.getWorldDimensions(gameObjects);

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.setMeshes(gameObjects, meshFactory, world);

                return world;
            });
    }

    protected setMeshes(gameObjects: GameObject[], meshFactory: MeshFactory<GameObject>, world: World): void {
        const meshes = gameObjects.map(gameObject => this.createMesh(gameObject, meshFactory, world));

        world.gameObjects = meshes;
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }

    private getWorldDimensions(gameObjects: GameObject[]): Vector2Model {
        const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

        return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
    }
}
