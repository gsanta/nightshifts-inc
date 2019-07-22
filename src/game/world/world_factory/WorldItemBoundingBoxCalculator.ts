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
        const dock = this.getDock(gwmWorldItem);
        const meshDimensions = mesh ? this.getRealMeshDimensions(mesh, gwmWorldItem) : this.getDefaultMeshDimensions(gwmWorldItem);

        let polygon = gwmWorldItem.dimensions//this.dockToDirection(null, gwmWorldItem.dimensions, null); //this.dockToDirection(dock, gwmWorldItem.dimensions, meshDimensions);
        return this.moveToWorldCenter(world, polygon);
    }

    private dockToDirection(dock: Direction, dimensions: Shape, meshDimensions: Vector2Model): Shape {
        return dimensions.translate(new Point(dimensions.getBoundingInfo().extent[1] / 2, dimensions.getBoundingInfo().extent[1] / 2));
        // switch (dock) {
        //     case Direction.NORTH_WEST:
        //         return dimensions.translate(new Point(meshDimensions.x(), meshDimensions.y()));
        //     case Direction.NORTH_EAST:
        //         return dimensions.translate(new Point(dimensions.getBoundingInfo().extent[0], 0));
        //     case Direction.SOUTH_EAST:
        //         return dimensions.translate(new Point(dimensions.getBoundingInfo().extent[0], dimensions.getBoundingInfo().extent[1]));
        //     case Direction.SOUTH_WEST:
        //         return dimensions.translate(new Point(meshDimensions.x(), dimensions.getBoundingInfo().extent[1] - meshDimensions.y()));
        //     case Direction.MIDDLE:
        //     default:
        //         throw new Error('Invalid dock direction: ' + dock);
        // }
    }

    private moveToWorldCenter(world: World, shape: Shape): Shape {

        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        return shape.translate(new Point(translateX, translateY));
    }

    private getDefaultMeshDimensions(worldItem: WorldItemInfo<AdditionalData>) {
        const width = worldItem.dimensions.getBoundingInfo().max[0] - worldItem.dimensions.getBoundingInfo().min[0];
        const height = worldItem.dimensions.getBoundingInfo().max[1] - worldItem.dimensions.getBoundingInfo().min[1];
        return new Vector2Model(width, height);
    }

    private getRealMeshDimensions(mesh: Mesh, worldItem: WorldItemInfo<AdditionalData>): Vector2Model {
        const xExtend = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
        const zExtend = mesh.getBoundingInfo().boundingBox.extendSize.y * mesh.scaling.y;

        switch (this.getOrientation(worldItem)) {
            case Orientation.NORTH:
            case Orientation.SOUTH:
            default:
                return new Vector2Model(xExtend, zExtend);
            case Orientation.WEST:
            case Orientation.EAST:
                return new Vector2Model(zExtend, xExtend);
        }
    }

    private getOrientation(itemInfo: WorldItemInfo) {
        return itemInfo.additionalData ? itemInfo.additionalData.orientation : undefined;
    }

    private getDock(itemInfo: WorldItemInfo) {
        return itemInfo.additionalData && itemInfo.additionalData.dock !== undefined ? itemInfo.additionalData.dock : Direction.MIDDLE;
    }
}
