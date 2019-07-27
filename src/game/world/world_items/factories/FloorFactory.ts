import { Mesh, Scene, Skeleton } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { GameObject } from '../item_types/GameObject';
import { WorldItemFactory } from '../../world_factory/WorldItemFactory';


export class FloorFactory {
    private scene: Scene;
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): GameObject {
        // const translate = new VectorModel(boundingBox.getBoundingInfo().min[0], 0, -boundingBox.getBoundingInfo().max[1]);
        // translate.addZ(-3);

        const meshModel = new GameObject(null, null, {type: 'floor'});

        return meshModel;
    }
}
