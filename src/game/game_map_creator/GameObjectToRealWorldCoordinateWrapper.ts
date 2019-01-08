import { GameObject, Rectangle } from 'game-worldmap-generator';
import { VectorModel } from '../model/core/VectorModel';
import { Direction } from '../model/utils/Direction';
import { Vector2Model } from '../model/utils/Vector2Model';

export class GameObjectToRealWorldCoordinateWrapper {
    private worldDimensions: Vector2Model;
    private gameObjectToMeshSizeRatio: number;

    constructor(worldDimensions: Vector2Model, gameObjectToMeshSizeRatio: number, ) {
        this.worldDimensions = worldDimensions;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public getTranslate(gameObject: GameObject, realMeshDimensions?: VectorModel): VectorModel {
        const realDimensions = this.changeToRealWorldDimensions(gameObject.dimensions);

        // if (this.gameObject.additionalData && this.gameObject.additionalData.dock) {
        const dock = gameObject.additionalData && gameObject.additionalData.dock ? Direction[<string> gameObject.additionalData.dock] : Direction.NORTH_WEST;
        const translate = this.getDockPosition(dock, realDimensions);
        return new VectorModel(translate.x(), 0, translate.y());
        // }
        
    }

    private  changeToRealWorldDimensions(rect: Rectangle) {
        const ratio = this.gameObjectToMeshSizeRatio;
        return new Rectangle(rect.left * ratio, rect.top * ratio, rect.width * ratio, rect.height * ratio);
    }

    private getDockPosition(dock: Direction, dimensions: Rectangle) {
        const x = (dimensions.left + dimensions.width / 2) - (this.worldDimensions.x() / 2);
        const y = (-dimensions.top - dimensions.height / 2) + (this.worldDimensions.y() / 2);

        const topLeft = new Vector2Model(x, y);

        switch(dock) {
            case Direction.NORTH_WEST:
                return topLeft;
            case Direction.NORTH_EAST:
                return new Vector2Model(topLeft.x() + dimensions.width, topLeft.y());
            case Direction.SOUTH_EAST: 
                return new Vector2Model(topLeft.x() + dimensions.width, topLeft.y() + dimensions.height);
            case Direction.SOUTH_WEST: 
                return new Vector2Model(topLeft.x(), topLeft.y() + dimensions.height);
            default:
                throw new Error('Invalid dock direction: ' + dock);
        }
    }
}