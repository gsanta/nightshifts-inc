import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../../model/World';
import { Rectangle, GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../../../model/core/MeshModel';
import { Player } from '../../../model/creature/type/Player';
import { GameObjectToRealWorldCoordinateMapper, GameObjectTranslator } from './game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { GameObjectToWorldCenterTranslatorDecorator } from './game_object_mappers/GameObjectToWorldCenterTranslatorDecorator';
import { AdditionalData } from './AdditionalData';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { AbstractWorldGenerator } from '../../../model/core/factories/AbstractWorldGenerator';
import { Promise } from 'es6-promise';
import { Scene, Vector2 } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { LightController } from '../../../model/light/LightController';

export class GwmWorldGenerator extends AbstractWorldGenerator<GameObject> {
    private gameObjectTranslator: GameObjectTranslator;

    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<GameObject>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(gameObjects: GameObject[]): Promise<World> {
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
        // const worldDimensions = this.getWorldDimensions(gameObjects);
        // const worldDimensions2 = new Vector2Model(worldDimensions.width, worldDimensions.height);
        // this.gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
        //     this.gameObjectToMeshSizeRatio,
        //     new GameObjectToRealWorldCoordinateMapper(this.gameObjectToMeshSizeRatio)
        // );

        const meshes = gameObjects.map(gameObject => this.createMesh(gameObject, meshFactory, world));

        world.gameObjects = meshes.filter(mesh => mesh.name !== 'floor');
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }

    // private rectangleToTranslateVector2(gameObject: GameObject, worldDimensions: { width: number, height: number }): VectorModel {
    //     const translatedVector = this.gameObjectTranslator.getTranslate(gameObject);
    //     return new VectorModel(translatedVector.x(), 0, -translatedVector.y());
    // }

    // private rectangleToTranslateVector(rect: Rectangle, worldDimensions: { width: number, height: number }): VectorModel {
    //     const x = (rect.left + rect.width / 2) * this.gameObjectToMeshSizeRatio - (worldDimensions.width / 2) * this.gameObjectToMeshSizeRatio;
    //     const z = (-rect.top - rect.height / 2) * this.gameObjectToMeshSizeRatio + (worldDimensions.height / 2) * this.gameObjectToMeshSizeRatio;
    //     return new VectorModel(x, 0, z);
    // }

    // private rectangleToDimensionVectorNarrow(rect: Rectangle): VectorModel {
    //     if (rect.width > rect.height) {
    //         return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 5, this.gameObjectToMeshSizeRatio);
    //     } else {
    //         return new VectorModel(this.gameObjectToMeshSizeRatio, 5, rect.height * this.gameObjectToMeshSizeRatio);
    //     }
    // }

    // private isVerticalWallPiece(dimensions: VectorModel) {
    //     return dimensions.z() > dimensions.x();
    // }

    // private verticalWallPiceTranslateAdjustment(translate: VectorModel) {
    //     // translate.setZ(this.gameObjectToMeshSizeRatio);
    // }

    // private verticalWallPieceDimensionsAdjustment(dimensions: VectorModel) {
    //     dimensions.addZ(-this.gameObjectToMeshSizeRatio);
    // }

    // private rectangleToDimensionVectorNormal(rect: Rectangle): VectorModel {
    //     return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 5, rect.height * this.gameObjectToMeshSizeRatio);
    // }

    private getWorldDimensions(gameObjects: GameObject[]): Vector2Model {
        const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

        return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
    }

    // private getPivotVector(rect: Rectangle, pivotAxis: {x: number, y: number}) {
    //     const isDoorHorizontal = () => rect.width > rect.height;

    //     if (isDoorHorizontal()) {
    //         if (pivotAxis.x === rect.left) {
    //             return new VectorModel(rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
    //         } else if (pivotAxis.x === rect.left + rect.width) {
    //             return new VectorModel(- rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
    //         }
    //     } else {
    //         if (pivotAxis.y === rect.top) {
    //             return new VectorModel(0, 0, - rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
    //         } else if (pivotAxis.y === rect.top + rect.height) {
    //             return new VectorModel(0, 0, rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
    //         }
    //     }
    // }
}
