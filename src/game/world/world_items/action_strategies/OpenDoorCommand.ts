import { WorldItemActionCommand } from './WorldItemActionCommand';
import { WorldItem } from '../item_types/WorldItem';
import { Scene } from '@babylonjs/core';

export class OpenDoorCommand implements WorldItemActionCommand {
    private scene: Scene;
    private door: WorldItem;

    constructor(scene: Scene, door: WorldItem) {
        this.door = door;
        this.scene = scene;
    }

    public execute() {
        if (this.door.animatedMeshes[0].rotation.y !== 0) {
            this.scene.beginAnimation(this.door.animatedMeshes[0], 10, 0, false, 1.0);
        } else {
            this.scene.beginAnimation(this.door.animatedMeshes[0], 0, 10, false, 1.0);
        }
    }
}
