import { Mesh, Skeleton, Vector3 } from '@babylonjs/core';
import { Point, Shape } from '@nightshifts.inc/geometry';
import { VectorModel } from '../core/VectorModel';


export interface GameObjectConfig {
    type: string;
    children: GameObject[];
    skeleton: Skeleton;
}

const defaulGameObjectConfig: GameObjectConfig = {
    type: 'default',
    children: [],
    skeleton: null
};

export class GameObject {

    health?: number;

    temperature?: number;

    label: string;

    isActive: boolean;

    meshes: Mesh[];
    animatedMeshes: Mesh[] = [];
    skeleton?: Skeleton;

    children: GameObject[] = [];
    /**
     * A cuboid mesh that encloses all of the meshes of the `GameObject`
     */
    boundingMesh?: Mesh;

    /**
     * Similar to what `instanceof` could be used for, similar objects should have the same type.
     * E.g room, wall etc.
     */
    type: string;

    parent: GameObject;

    boundingBox: Shape;

    constructor(meshes: Mesh[], boundingBox: Shape, worldItemConfig?: Partial<GameObjectConfig>) {
        worldItemConfig = {...defaulGameObjectConfig, ...worldItemConfig};
        this.meshes = meshes;
        this.boundingBox = boundingBox;
        this.type = worldItemConfig.type;
        this.children = [...worldItemConfig.children];
        this.skeleton = worldItemConfig.skeleton;
    }

    setPosition(position: VectorModel): void {
        this.meshes[0].position = new Vector3(position.x, this.meshes[0].getAbsolutePosition().y, position.z);
        const center = this.meshes[0].getBoundingInfo().boundingSphere.centerWorld;
        this.boundingBox = this.boundingBox.setPosition(new Point(center.x, center.z));

        if (this.boundingMesh) {
            this.boundingMesh.position = new Vector3(position.x, 1, position.z);
        }
    }

    intersectsWorldItem(otherWorldItem: GameObject) {
        return this.meshes[0].intersectsMesh(otherWorldItem.meshes[0]);
    }

    setBoudingBox(shape: Shape) {
        this.boundingBox = shape;
        const center = shape.getBoundingCenter();
        this.setPosition(new VectorModel(center.x, this.meshes[0].position.y, center.y));
        this.boundingBox = shape;
    }
}
