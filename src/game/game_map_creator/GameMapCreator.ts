import { GameObject } from '../game_object_parser/GameObject';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import { GameMap } from './GameMap';
import { Rectangle } from 'game-worldmap-generator';


export class GameMapCreator {
    private meshFactory: MeshFactory;
    private gameObjectToMeshSizeRatio: number;

    constructor(meshFactory: MeshFactory, gameObjectToMeshSizeRatio = 10) {
        this.meshFactory = meshFactory;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public create(gameObjects: GameObject[]): GameMap {
        const walls = gameObjects
            .filter(gameObject => gameObject.type === 'W')
            .map(gameObject => {
                const translate = this.rectangleToTranslateVector(gameObject.dimensions);
                const dimensions = this.rectangleToDimensionVector(gameObject.dimensions);

                return this.meshFactory.createWall(translate, dimensions);
            });

        const gameMap = new GameMap();
        gameMap.gameObjects = walls;

        return gameMap;
    }

    private rectangleToTranslateVector(rect: Rectangle): VectorModel {
        return new VectorModel(rect.left * this.gameObjectToMeshSizeRatio, 5, rect.top * this.gameObjectToMeshSizeRatio);
    }

    private rectangleToDimensionVector(rect: Rectangle): VectorModel {
        return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 10, rect.height * this.gameObjectToMeshSizeRatio);
    }
}
