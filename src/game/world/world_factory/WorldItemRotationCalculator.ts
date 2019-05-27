import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { AdditionalData } from '../world_import/AdditionalData';
import { Orientation } from '../../model/utils/Orientation';


export class WorldItemRotationCalculator {

    public getRotation(worldItem: WorldItemInfo<AdditionalData>): number {
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

}