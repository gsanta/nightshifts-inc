import { Scene } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';

export class SceneModel {
    private scene: Scene;
    private dimensions: Polygon;

    constructor(scene: Scene, dimensions: Polygon) {
        this.scene = scene;
        this.dimensions = dimensions;
    }

    public getWidth() {
        return this.dimensions.xExtent();
    }

    public getMinX() {
        return this.dimensions.getBoundingRectangle().minX();
    }

    public getDepth() {
        return this.dimensions.yExtent();
    }

    public getMinZ() {
        return this.dimensions.getBoundingRectangle().maxY();
    }
}

