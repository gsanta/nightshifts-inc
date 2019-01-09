import { GameObject, Rectangle } from 'game-worldmap-generator';
import { VectorModel } from '../model/core/VectorModel';
import { Direction } from '../model/utils/Direction';
import { Vector2Model } from '../model/utils/Vector2Model';

export interface GameObjectTranslator {
    getTranslate(gameObject: GameObject, realMeshDimensions?: VectorModel): Vector2Model;
}

export class GameObjectToRealWorldCoordinateWrapper implements GameObjectTranslator {
    private worldDimensions: Vector2Model;
    private gameObjectToMeshSizeRatio: number;

    constructor(worldDimensions: Vector2Model, gameObjectToMeshSizeRatio: number, ) {
        this.worldDimensions = worldDimensions;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public getTranslate(gameObject: GameObject, realMeshDimensions?: VectorModel): Vector2Model {
        const realDimensions = this.changeToRealWorldDimensions(gameObject.dimensions, this.gameObjectToMeshSizeRatio);

        // if (this.gameObject.additionalData && this.gameObject.additionalData.dock) {
        const dock = gameObject.additionalData && gameObject.additionalData.dock !== undefined ? gameObject.additionalData.dock : Direction.MIDDLE;
        return this.getDockPosition(dock, realDimensions);
        // return new VectorModel(translate.x(), 0, translate.y());
        // }
    }

    private changeToRealWorldDimensions(rect: Rectangle, gameObjectToMeshSizeRatio: number) {
        const ratio = gameObjectToMeshSizeRatio;
        return new Rectangle(rect.left * ratio, rect.top * ratio, rect.width * ratio, rect.height * ratio);
    }

    private getDockPosition(dock: Direction, dimensions: Rectangle) {
        const x = dimensions.left;
        const y = dimensions.top;
    
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
            case Direction.MIDDLE:
                return new Vector2Model(x + dimensions.width / 2, y + dimensions.height / 2);
            default:
                throw new Error('Invalid dock direction: ' + dock);
        }
    }
}