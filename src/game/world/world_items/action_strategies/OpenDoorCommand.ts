import { WorldItemActionCommand } from './WorldItemActionCommand';
import { WorldItem } from '../item_types/WorldItem';
import { Axis, Space, Scene } from '@babylonjs/core';
import { World } from '../../World';

export class OpenDoorCommand implements WorldItemActionCommand {
    private isOpen = false;
    private scene: Scene;
    private door: WorldItem;
    private pivotAngle: number;

    constructor(scene: Scene, door: WorldItem, pivotAngle: number) {
        this.door = door;
        this.pivotAngle = pivotAngle;
        this.scene = scene;
    }

    public execute() {
        if (this.isOpen) {
            this.scene.beginAnimation(this.door.mesh, 10, 0, false, 1.0);
            // this.door.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.scene.beginAnimation(this.door.mesh, 0, 10, false, 1.0);
            // this.door.mesh.rotation.y = this.pivotAngle;
            this.isOpen = true;
        }
    }
}
