import { Mesh, StandardMaterial, PhysicsImpostor, Skeleton } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { Shape } from '@nightshifts.inc/geometry';
import { WorldItemActionCommand } from '../action_strategies/WorldItemActionCommand';

export interface SerializedMeshModel {
    name: string;
    scaling: {
        x: number,
        y: number,
        z: number
    };
    translate: {
        x: number,
        y: number,
        z: number
    };
    additionalData?: {
        axis?: {
            x: number,
            y: number,
            z: number
        };
        axis1?: {
            x: number,
            y: number,
            z: number
        };
        axis2?: {
            x: number,
            y: number,
            z: number
        };
        rotation?: number;
        angle?: number;
    };
}
export interface GameObject {

    health?: number;

    temperature?: number;

    label: string;

    isActive: boolean;

    mesh?: Mesh;
    animatedMeshes: Mesh[];
    skeleton?: Skeleton;

    children: GameObject[];
    /**
     * A cuboid mesh that encloses all of the meshes of the WorldItem
     */
    boundingMesh?: Mesh;

    /**
     * Similar to what `instanceof` could be used for, similar objects should have the same type.
     * E.g room, wall etc.
     */
    type: string;

    parent: GameObject;

    setPosition(vectorModel: VectorModel): void;
    getHeight(): number;
    getRotation(): VectorModel;
    getBoundingBox(): Shape;
    intersectsWorldItem(otherWorldItem: GameObject);
}
