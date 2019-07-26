import { WorldItemActionCommand } from './WorldItemActionCommand';
import { GameObject } from '../item_types/GameObject';
import { Scene } from '@babylonjs/core';

export class OpenWindowCommand implements WorldItemActionCommand {
    private scene: Scene;
    private window: GameObject;

    constructor(scene: Scene, window: GameObject) {
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
