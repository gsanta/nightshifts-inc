import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { Mesh } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon } from '@nightshifts.inc/geometry';

export class EmptyArea extends SimpleWorldItem {

    constructor(mesh: Mesh, boundingPolygon: Polygon) {
        super(mesh, boundingPolygon, {type: 'empty'});

        this.boundingBox = boundingPolygon;
    }

    public getCenterPosition(): VectorModel {
        const center = this.boundingBox.getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getBoundingBox(): Polygon {
        return this.boundingBox;
    }
}

