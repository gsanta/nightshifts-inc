import { GameObject, Rectangle } from 'game-worldmap-generator';
import { VectorModel } from '../model/core/VectorModel';
import { Direction } from '../model/utils/Direction';
import { Vector2Model } from '../model/utils/Vector2Model';
import { AdditionalData } from './AdditionalData';
import { Orientation } from '../model/utils/Orientation';
import { DEFAULT_ECDH_CURVE } from 'tls';

export interface GameObjectTranslator {
    getTranslate(gameObject: GameObject, realMeshDimensions?: Vector2Model): Vector2Model;
    getDimensions(gameObject: GameObject): Vector2Model;
    getRotation(gameObject: GameObject): number;
}

export class GameObjectToRealWorldCoordinateWrapper implements GameObjectTranslator {
    private worldDimensions: Vector2Model;
    private gameObjectToMeshSizeRatio: number;

    constructor(worldDimensions: Vector2Model, gameObjectToMeshSizeRatio: number) {
        this.worldDimensions = worldDimensions;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public getTranslate(gameObject: GameObject, realMeshDimensions: Vector2Model = new Vector2Model(0, 0)): Vector2Model {
        const realDimensions = this.changeToRealWorldDimensions(gameObject.dimensions, this.gameObjectToMeshSizeRatio);

        const dock = gameObject.additionalData && gameObject.additionalData.dock !== undefined ? gameObject.additionalData.dock : Direction.MIDDLE;
        return this.getDockPosition(dock, realDimensions, realMeshDimensions);
    }

    public getDimensions(gameObject: GameObject): Vector2Model {
        const rect = gameObject.dimensions;
        if (rect.width > rect.height) {
            return new Vector2Model(rect.width * this.gameObjectToMeshSizeRatio, this.gameObjectToMeshSizeRatio);
        } else {
            return new Vector2Model(this.gameObjectToMeshSizeRatio, rect.height * this.gameObjectToMeshSizeRatio);
        }
    }

    public getRotation(gameObject: GameObject<AdditionalData>) {
        const orientation = gameObject.additionalData.orientation;

        return this.getRotationForOrientation(orientation);
    }

    private getRotationForOrientation(orientation: Orientation) {
        switch (orientation) {
            case Orientation.NORTH:
                return Math.PI;
            case Orientation.EAST:
                return - Math.PI / 2;
            case Orientation.WEST:
                return Math.PI / 2;
            case Orientation.SOUTH:
            default:
                return 0;
        }
    }

    private changeToRealWorldDimensions(rect: Rectangle, gameObjectToMeshSizeRatio: number) {
        const ratio = gameObjectToMeshSizeRatio;
        return new Rectangle(rect.left * ratio, rect.top * ratio, rect.width * ratio, rect.height * ratio);
    }

    private getDockPosition(dock: Direction, dimensions: Rectangle, meshDimensions: Vector2Model) {
        const x = dimensions.left;
        const y = dimensions.top;

        const topLeft = new Vector2Model(x, y);

        switch (dock) {
            case Direction.NORTH_WEST:
                return topLeft;
            case Direction.NORTH_EAST:
                return new Vector2Model(topLeft.x() + dimensions.width, topLeft.y());
            case Direction.SOUTH_EAST:
                return new Vector2Model(topLeft.x() + dimensions.width, topLeft.y() + dimensions.height);
            case Direction.SOUTH_WEST:
                return new Vector2Model(topLeft.x(), topLeft.y() + dimensions.height - meshDimensions.y());
            case Direction.MIDDLE:
                return new Vector2Model(x + dimensions.width / 2, y + dimensions.height / 2);
            default:
                throw new Error('Invalid dock direction: ' + dock);
        }
    }
}