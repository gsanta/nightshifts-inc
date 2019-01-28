import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { SerializedMeshModel, MeshModel } from '../../../model/core/MeshModel';
import { World } from '../../../model/World';
import { AbstractWorldGenerator } from '../../../model/core/factories/AbstractWorldGenerator';
import { Player } from '../../../model/creature/type/Player';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { GameObject } from 'game-worldmap-generator';


export class JsonWorldGenerator extends AbstractWorldGenerator<SerializedMeshModel> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<SerializedMeshModel>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(serializedMeshModels: SerializedMeshModel[]): Promise<World> {
        return super.create(serializedMeshModels);
    }

    protected setMeshes(serializedMeshModel: SerializedMeshModel[], meshFactory: MeshFactory<SerializedMeshModel>, world: World): void {
        // const worldDimensions = this.getWorldDimensions(gameObjects);
        // const worldDimensions2 = new Vector2Model(worldDimensions.width, worldDimensions.height);
        // this.gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
        //     this.gameObjectToMeshSizeRatio,
        //     new GameObjectToRealWorldCoordinateMapper(this.gameObjectToMeshSizeRatio)
        // );

        const meshes = serializedMeshModel.map(gameObject => this.createMesh(gameObject, meshFactory, world));

        world.gameObjects = meshes.filter(mesh => mesh.name !== 'floor');
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }
}
