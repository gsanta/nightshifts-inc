import { MeshFactory } from '../model/core/factories/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import { WorldMap } from './WorldMap';
import { Rectangle, GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../model/core/MeshModel';
import { Player } from '../model/creature/type/Player';
import { GameObjectToRealWorldCoordinateWrapper, GameObjectTranslator } from './GameObjectToRealWorldCoordinateWrapper';
import { Vector2Model } from '../model/utils/Vector2Model';
import { GameObjectToWorldCenterTranslatorDecorator } from './GameObjectToWorldCenterTranslatorDecorator';
import { AdditionalData } from './AdditionalData';

export class WorldMapGenerator {
    private meshFactory: MeshFactory;
    private gameObjectToMeshSizeRatio: number;
    private gameObjectTranslator: GameObjectTranslator;

    constructor(meshFactory: MeshFactory, gameObjectToMeshSizeRatio = 10) {
        this.meshFactory = meshFactory;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public create(gameObjects: GameObject[]): WorldMap {
        const worldMap = new WorldMap();
        const worldDimensions = this.getWorldDimensions(gameObjects);
        const worldDimensions2 = new Vector2Model(worldDimensions.width, worldDimensions.height);
        this.gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
            new Vector2Model(worldDimensions.width, worldDimensions.height),
            this.gameObjectToMeshSizeRatio,
            new GameObjectToRealWorldCoordinateWrapper(worldDimensions2, this.gameObjectToMeshSizeRatio)
        );

        const meshes = gameObjects.map(gameObject => this.createMesh(gameObject, worldMap));

        worldMap.gameObjects = meshes.filter(mesh => mesh.name !== 'floor');
        worldMap.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        worldMap.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];

        return worldMap;
    }

    private createMesh(gameObject: GameObject<AdditionalData>, worldMap: WorldMap): MeshModel {
        switch (gameObject.name) {
            case 'wall':
                return this.meshFactory.createWall(gameObject);
            case 'door':
                return this.meshFactory.createDoor(gameObject);
            case 'window':
                return this.meshFactory.createWindow(gameObject);
            case 'floor':
                return this.meshFactory.createFloor(gameObject);
            case 'player':
                return this.meshFactory.createPlayer(gameObject, worldMap);
            case 'bed':
                return this.meshFactory.createBed(gameObject);
            case 'table':
                return this.meshFactory.createTable(gameObject);
            case 'cupboard':
                return this.meshFactory.createCupboard(gameObject);
            case 'bathtub':
                return this.meshFactory.createBathtub(gameObject);
            case 'washbasin':
                return this.meshFactory.createWashbasin(gameObject);
            default:
                throw new Error('Unknown GameObject type: ' + gameObject.name);
        }
    }

    private rectangleToTranslateVector2(gameObject: GameObject, worldDimensions: { width: number, height: number }): VectorModel {
        const translatedVector = this.gameObjectTranslator.getTranslate(gameObject);
        return new VectorModel(translatedVector.x(), 0, -translatedVector.y());
    }

    private rectangleToTranslateVector(rect: Rectangle, worldDimensions: { width: number, height: number }): VectorModel {
        const x = (rect.left + rect.width / 2) * this.gameObjectToMeshSizeRatio - (worldDimensions.width / 2) * this.gameObjectToMeshSizeRatio;
        const z = (-rect.top - rect.height / 2) * this.gameObjectToMeshSizeRatio + (worldDimensions.height / 2) * this.gameObjectToMeshSizeRatio;
        return new VectorModel(x, 0, z);
    }

    private rectangleToDimensionVectorNarrow(rect: Rectangle): VectorModel {
        if (rect.width > rect.height) {
            return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 5, this.gameObjectToMeshSizeRatio);
        } else {
            return new VectorModel(this.gameObjectToMeshSizeRatio, 5, rect.height * this.gameObjectToMeshSizeRatio);
        }
    }

    private isVerticalWallPiece(dimensions: VectorModel) {
        return dimensions.z() > dimensions.x();
    }

    private verticalWallPiceTranslateAdjustment(translate: VectorModel) {
        // translate.setZ(this.gameObjectToMeshSizeRatio);
    }

    private verticalWallPieceDimensionsAdjustment(dimensions: VectorModel) {
        dimensions.addZ(-this.gameObjectToMeshSizeRatio);
    }

    private rectangleToDimensionVectorNormal(rect: Rectangle): VectorModel {
        return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 5, rect.height * this.gameObjectToMeshSizeRatio);
    }

    private getWorldDimensions(gameObjects: GameObject[]): { width: number, height: number } {
        const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

        return {
            width: floor.dimensions.width,
            height: floor.dimensions.height
        };
    }

    private getPivotVector(rect: Rectangle, pivotAxis: {x: number, y: number}) {
        const isDoorHorizontal = () => rect.width > rect.height;

        if (isDoorHorizontal()) {
            if (pivotAxis.x === rect.left) {
                return new VectorModel(rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
            } else if (pivotAxis.x === rect.left + rect.width) {
                return new VectorModel(- rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
            }
        } else {
            if (pivotAxis.y === rect.top) {
                return new VectorModel(0, 0, - rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
            } else if (pivotAxis.y === rect.top + rect.height) {
                return new VectorModel(0, 0, rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
            }
        }
    }
}
