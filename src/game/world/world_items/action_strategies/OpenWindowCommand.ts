import { WorldItemActionCommand } from './WorldItemActionCommand';
import { WorldItem } from '../item_types/WorldItem';
import { Scene } from '@babylonjs/core';

export class OpenWindowCommand implements WorldItemActionCommand {
    private isOpen = false;
    private scene: Scene;
    private window: WorldItem;

    constructor(scene: Scene, window: WorldItem, pivotAngle: number) {
        this.window = window;
        this.scene = scene;
    }

    public execute() {
        if (this.isOpen) {
            this.scene.beginAnimation(this.window.animatedMeshes[0], 10, 0, false, 1.0);
            this.isOpen = false;
        } else {
            this.scene.beginAnimation(this.window.animatedMeshes[0], 0, 10, false, 1.0);
            this.isOpen = true;
        }
    }
}
