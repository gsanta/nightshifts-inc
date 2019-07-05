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
        return this.dimensions.getBoundingInfo().extent[0];
    }

    public getMinX() {
        return this.dimensions.getBoundingRectangle().getBoundingInfo().min[0];
    }

    public getDepth() {
        return this.dimensions.getBoundingInfo().extent[1];
    }

    public getMinZ() {
        return this.dimensions.getBoundingRectangle().getBoundingInfo().max[1];
    }
}

