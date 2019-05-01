import { Scene } from 'babylonjs';
import { Rectangle } from '@nightshifts.inc/geometry';

export class SceneModel {
    private scene: Scene;
    private dimensions: Rectangle;

    constructor(scene: Scene, dimensions: Rectangle) {
        this.scene = scene;
        this.dimensions = dimensions;
    }

    public getWidth() {
        return this.dimensions.width;
    }

    public getMinX() {
        return this.dimensions.left;
    }

    public getDepth() {
        return this.dimensions.height;
    }

    public getMinZ() {
        return this.dimensions.top;
    }
}

