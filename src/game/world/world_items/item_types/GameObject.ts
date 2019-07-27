import { Mesh, Skeleton, Vector3 } from '@babylonjs/core';
import { Point, Shape } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';


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

    mesh?: Mesh;
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

    constructor(mesh: Mesh, boundingBox: Shape, worldItemConfig?: Partial<GameObjectConfig>) {
        worldItemConfig = {...defaulGameObjectConfig, ...worldItemConfig};
        this.mesh = mesh;
        this.boundingBox = boundingBox;
        this.type = worldItemConfig.type;
        this.children = [...worldItemConfig.children];
        this.skeleton = worldItemConfig.skeleton;
    }

    setPosition(position: VectorModel): void {
        this.mesh.position = new Vector3(position.x, this.mesh.getAbsolutePosition().y, position.z);
        const center = this.mesh.getBoundingInfo().boundingSphere.centerWorld;
        this.boundingBox = this.boundingBox.setPosition(new Point(center.x, center.z));

        if (this.boundingMesh) {
            this.boundingMesh.position = new Vector3(position.x, 1, position.z);
        }
    }

    getHeight(): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    getRotation(): VectorModel {
        const vector = this.mesh.rotationQuaternion.toEulerAngles();
        return new VectorModel(vector.x, vector.y, vector.z);
    }

    intersectsWorldItem(otherWorldItem: GameObject) {
        return this.mesh.intersectsMesh(otherWorldItem.mesh);
    }

    setBoudingBox(shape: Shape) {
        this.boundingBox = shape;
        const center = shape.getBoundingCenter();
        this.setPosition(new VectorModel(center.x, this.mesh.position.y, center.y));
        this.boundingBox = shape;
    }
}
