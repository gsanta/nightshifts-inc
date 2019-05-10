import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { Direction } from '../../../model/utils/Direction';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { AdditionalData } from '../../world_import/AdditionalData';
import { Orientation } from '../../../model/utils/Orientation';
import { World } from '../../World';
import { Rectangle, Polygon, Point } from '@nightshifts.inc/geometry';

export interface WorldItemTranslator {
    getTranslate(polygon: Polygon, dock?: Direction, realMeshDimensions?: Vector2Model): Polygon;
    getRotation(worldItem: GwmWorldItem): number;
}

export class WorldItemToRealWorldCoordinateMapper implements WorldItemTranslator {

    public getTranslate(polygon: Polygon, dock: Direction = Direction.MIDDLE, realMeshDimensions: Vector2Model = new Vector2Model(0, 0)): Polygon {
        return this.getDockPosition(dock, polygon, realMeshDimensions);
    }

    public getRotation(worldItem: GwmWorldItem<AdditionalData>) {
        const orientation = worldItem.additionalData.orientation;

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

    private getDockPosition(dock: Direction, dimensions: Polygon, meshDimensions: Vector2Model): Polygon {
        switch (dock) {
            case Direction.NORTH_WEST:
                return dimensions.translate(new Point(meshDimensions.x(), meshDimensions.y()));
            case Direction.NORTH_EAST:
                return dimensions.translate(new Point(dimensions.width, 0));
            case Direction.SOUTH_EAST:
                return dimensions.translate(new Point(dimensions.width, dimensions.height));
            case Direction.SOUTH_WEST:
                return dimensions.translate(new Point(meshDimensions.x(), dimensions.height - meshDimensions.y()));
            case Direction.MIDDLE:
                return dimensions.translate(new Point(dimensions.width / 2, dimensions.height / 2));
            default:
                throw new Error('Invalid dock direction: ' + dock);
        }
    }
}
