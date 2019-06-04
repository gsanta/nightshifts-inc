import { Direction } from '../../model/utils/Direction';
import { Polygon, Point, Shape } from '@nightshifts.inc/geometry';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { World } from '../World';
import { Orientation } from '../../model/utils/Orientation';
import { Mesh } from '@babylonjs/core';
import { AdditionalData } from '../world_import/AdditionalData';


export class WorldItemBoundingBoxCalculator {
    public getBoundingBox(world: World, gwmWorldItem: WorldItemInfo, mesh: Mesh): Shape {
        const dock = gwmWorldItem.additionalData.dock !== undefined ? gwmWorldItem.additionalData.dock : Direction.MIDDLE;
        const meshDimensions = this.getRealMeshDimensions(mesh, gwmWorldItem);

        let polygon = this.dockToDirection(dock, gwmWorldItem.dimensions, meshDimensions);
        return this.moveToWorldCenter(world, polygon);
    }

    private dockToDirection(dock: Direction, dimensions: Shape, meshDimensions: Vector2Model): Shape {
        switch (dock) {
            case Direction.NORTH_WEST:
                return dimensions.translate(new Point(meshDimensions.x(), meshDimensions.y()));
            case Direction.NORTH_EAST:
                return dimensions.translate(new Point(dimensions.xExtent(), 0));
            case Direction.SOUTH_EAST:
                return dimensions.translate(new Point(dimensions.xExtent(), dimensions.yExtent()));
            case Direction.SOUTH_WEST:
                return dimensions.translate(new Point(meshDimensions.x(), dimensions.yExtent() - meshDimensions.y()));
            case Direction.MIDDLE:
                return dimensions.translate(new Point(dimensions.yExtent() / 2, dimensions.yExtent() / 2));
            default:
                throw new Error('Invalid dock direction: ' + dock);
        }
    }

    private moveToWorldCenter(world: World, shape: Shape): Shape {

        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        return shape.translate(new Point(translateX, translateY));
    }

    private getRealMeshDimensions(mesh: Mesh, worldItem: WorldItemInfo<AdditionalData>): Vector2Model {
        const xExtend = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
        const zExtend = mesh.getBoundingInfo().boundingBox.extendSize.y * mesh.scaling.y;

        switch (worldItem.additionalData.orientation) {
            case Orientation.NORTH:
            case Orientation.SOUTH:
            default:
                return new Vector2Model(xExtend, zExtend);
            case Orientation.WEST:
            case Orientation.EAST:
                return new Vector2Model(zExtend, xExtend);
        }
    }
}
