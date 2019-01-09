import { GameObject } from 'game-worldmap-generator';
import { GameObjectToRealWorldCoordinateWrapper, GameObjectTranslator } from './GameObjectToRealWorldCoordinateWrapper';
import { Vector2Model } from '../model/utils/Vector2Model';
import { VectorModel } from '../model/core/VectorModel';


export class GameObjectToWorldCenterTranslatorDecorator implements GameObjectTranslator {
    private worldDimensions: Vector2Model;
    private gameObjectToMeshSizeRatio: number;
    private gameObjectToRealWorldCoordinateWrapper: GameObjectTranslator;

    constructor(worldDimensions: Vector2Model, gameObjectToMeshSizeRatio: number, gameObjectToRealWorldCoordinateWrapper: GameObjectTranslator) {
        this.worldDimensions = worldDimensions;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.gameObjectToRealWorldCoordinateWrapper = gameObjectToRealWorldCoordinateWrapper;
    }

    public getTranslate(gameObject: GameObject, realMeshDimensions?: VectorModel): Vector2Model {
        const vector2 = this.gameObjectToRealWorldCoordinateWrapper.getTranslate(gameObject, realMeshDimensions);

        const translateX = - (this.worldDimensions.x() / 2) * this.gameObjectToMeshSizeRatio;
        const translateY = (this.worldDimensions.y() / 2) * this.gameObjectToMeshSizeRatio;
        return vector2.add(new Vector2Model(translateX, translateY));
    }
}