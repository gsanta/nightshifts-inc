import { Mesh, Skeleton } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';


export interface MeshCreationOptions {
    rotation: number;
}

export class MeshCreator {
    private referenceMeshes: [Mesh[], Skeleton[]];

    constructor(referenceMeshes: [Mesh[], Skeleton[]]) {
        this.referenceMeshes = referenceMeshes;
    }

    public createMesh(boundingBox: Polygon, ) {
        const meshes = this.referenceMeshes[0].map(mesh => mesh.clone(`${this.referenceMeshes[0][0].name}`));

        meshes[0].isVisible = true;
    }
}
