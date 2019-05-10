
import { Mesh, Skeleton } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../SimpleWorldItem';
import { WorldItem } from '../WorldItem';

export class ModelFactory2 {
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public createItem(mesh: Mesh, boundingBox: Polygon, rotation: number): WorldItem {
        mesh.isVisible = true;

        boundingBox = boundingBox.negateY();

        const meshModel = new SimpleWorldItem(mesh, mesh.name, boundingBox);
        meshModel.rotateY(rotation);
        meshModel.setBoudingBox(boundingBox);

        return meshModel;
    }
}
