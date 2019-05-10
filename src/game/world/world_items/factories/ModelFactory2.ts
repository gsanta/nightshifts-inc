
import { Mesh, Skeleton } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';

export class ModelFactory2 {
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): WorldItem {
        meshes[0].isVisible = true;

        boundingBox = boundingBox.negateY();

        const meshModel = new SimpleWorldItem(meshes[0], meshes[0].name, boundingBox);
        meshModel.rotateY(rotation);
        meshModel.setBoudingBox(boundingBox);

        return meshModel;
    }
}
