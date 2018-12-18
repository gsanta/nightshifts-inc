import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import { WorldMap } from './WorldMap';
import { Rectangle, GameObject, GameObjectParser } from 'game-worldmap-generator';
import { MeshModel } from '../model/core/MeshModel';


export class WorldMapGenerator {
    private meshFactory: MeshFactory;
    private gameObjectToMeshSizeRatio: number;
    private gameObjectParser: GameObjectParser;

    constructor(gameObjectParser: GameObjectParser, meshFactory: MeshFactory, gameObjectToMeshSizeRatio = 10) {
        this.gameObjectParser = gameObjectParser;
        this.meshFactory = meshFactory;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public create(worldMapStr: string): WorldMap {
        const gameObjects = this.gameObjectParser.parse(worldMapStr);
        const walls = gameObjects.map(gameObject => this.createMesh(gameObject));

        const worldMap = new WorldMap();
        worldMap.gameObjects = walls;

        return worldMap;
    }

    private createMesh(gameObject: GameObject): MeshModel {

        const translate = this.rectangleToTranslateVector(gameObject.dimensions);
        const dimensions = this.rectangleToDimensionVector(gameObject.dimensions);

        switch(gameObject.name) {
            case 'wall':
                return this.meshFactory.createWall(translate, dimensions);
            case 'door':
                return this.meshFactory.createDoor(translate, dimensions);
            case 'window':
                return this.meshFactory.createWindow(translate, dimensions);
            default:
                throw new Error('Unknown GameObject type: ' + gameObject.name);
        }
    }

    private rectangleToTranslateVector(rect: Rectangle): VectorModel {
        return new VectorModel(rect.left * this.gameObjectToMeshSizeRatio, 5, rect.top * this.gameObjectToMeshSizeRatio);
    }

    private rectangleToDimensionVector(rect: Rectangle): VectorModel {
        return new VectorModel(rect.width * this.gameObjectToMeshSizeRatio, 10, rect.height * this.gameObjectToMeshSizeRatio);
    }
}
