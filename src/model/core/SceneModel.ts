import { Scene } from 'babylonjs';


export class SceneModel {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public getWidth() {
        return this.scene.getWorldExtends().max.x - this.scene.getWorldExtends().min.x;
    }

    public getMinX() {
        return this.scene.getWorldExtends().min.x;
    }

    public getDepth() {
        return this.scene.getWorldExtends().max.z - this.scene.getWorldExtends().min.z;
    }

    public getMinZ() {
        return this.scene.getWorldExtends().min.z;
    }
}