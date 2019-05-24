import { WorldItemActionCommand } from './WorldItemActionCommand';
import { WorldItem } from '../item_types/WorldItem';

export class OpenDoorCommand implements WorldItemActionCommand {
    private isOpen = false;
    private door: WorldItem;
    private pivotAngle: number;

    constructor(door: WorldItem, pivotAngle: number) {
        this.door = door;
        this.pivotAngle = pivotAngle;
    }

    public execute() {
        if (this.isOpen) {
            this.door.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.door.mesh.rotation.y = this.pivotAngle;
            this.isOpen = true;
        }    }
}
