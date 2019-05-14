
import { Mesh, Skeleton, Space } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';

export class ModelFactory2 {
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): WorldItem {
        meshes[0].isVisible = true;

        boundingBox = boundingBox.mirrorY();

        const meshModel = new SimpleWorldItem(meshes[0], meshes[0].name, boundingBox);

        boundingBox = boundingBox.addX(- boundingBox.width / 2);
        boundingBox = boundingBox.addY(boundingBox.height / 2);
        meshModel.setBoudingBox(boundingBox);

        meshModel.rotateY(rotation);
        return meshModel;
    }
}
