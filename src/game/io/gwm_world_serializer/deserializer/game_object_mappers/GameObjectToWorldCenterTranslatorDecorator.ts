import { GameObject } from 'game-worldmap-generator';
import { GameObjectTranslator } from './GameObjectToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { World } from '../../../../model/World';


export class GameObjectToWorldCenterTranslatorDecorator implements GameObjectTranslator {
    private gameObjectToMeshSizeRatio: number;
    private gameObjectToRealWorldCoordinateMapper: GameObjectTranslator;

    constructor(gameObjectToMeshSizeRatio: number, gameObjectToRealWorldCoordinateWrapper: GameObjectTranslator) {
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.gameObjectToRealWorldCoordinateMapper = gameObjectToRealWorldCoordinateWrapper;
    }

    public getTranslate(gameObject: GameObject, realMeshDimensions: Vector2Model, world: World): Vector2Model {
        const vector2 = this.gameObjectToRealWorldCoordinateMapper.getTranslate(gameObject, realMeshDimensions, world);

        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);
        return vector2.add(new Vector2Model(translateX, translateY));
    }

    public getDimensions(gameObject: GameObject): Vector2Model {
        return this.gameObjectToRealWorldCoordinateMapper.getDimensions(gameObject);
    }

    public getRotation(gameObject: GameObject) {
        return this.gameObjectToRealWorldCoordinateMapper.getRotation(gameObject);
    }
}
