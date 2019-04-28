import { SimpleWorldItem } from '../SimpleWorldItem';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon } from 'game-worldmap-generator';

export class EmptyArea extends SimpleWorldItem {
    private boundingPolygon: Polygon;

    constructor(mesh: Mesh, boundingPolygon: Polygon) {
        super(mesh, 'empty');

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

