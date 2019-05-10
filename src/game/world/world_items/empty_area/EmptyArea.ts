import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { Mesh } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon } from '@nightshifts.inc/geometry';

export class EmptyArea extends SimpleWorldItem {

    constructor(mesh: Mesh, boundingPolygon: Polygon) {
        super(mesh, 'empty', boundingPolygon);

        this.boundingPolygon = boundingPolygon;
    }

    public getCenterPosition(): VectorModel {
        const center = this.boundingPolygon.getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getBoundingPolygon(): Polygon {
        return this.boundingPolygon;
    }
}

