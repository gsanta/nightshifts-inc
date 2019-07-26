import { WorldItemActionCommand } from './WorldItemActionCommand';
import { WorldItem } from '../item_types/WorldItem';
import { Scene } from '@babylonjs/core';

export class OpenWindowCommand implements WorldItemActionCommand {
    private scene: Scene;
    private window: WorldItem;

    constructor(scene: Scene, window: WorldItem) {
        this.window = window;
        this.scene = scene;
    }

    public execute() {
        if (this.window.animatedMeshes[0].rotation.x !== 0) {
            this.scene.beginAnimation(this.window.animatedMeshes[0], 10, 0, false, 1.0);
        } else {
            this.scene.beginAnimation(this.window.animatedMeshes[0], 0, 10, false, 1.0);
        }
    }
}
