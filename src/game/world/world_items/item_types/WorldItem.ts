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

export interface WorldItem {
    health?: number;
    defaultAction: WorldItemActionCommand;

    temperature?: number;

    label: string;

    isActive: boolean;

    /**
     * Determines whether the bounding mesh (which can be set through the `setBoundingMesh`) is visible or not
     */
    isBoundingMeshVisible(): boolean;
    setBoundingMeshVisible(visible: boolean);

    mesh?: Mesh;
    animatedMeshes: Mesh[];
    skeleton?: Skeleton;

    getChildren(): WorldItem[];

    /**
     * A cuboid mesh that encloses all of the meshes of the WorldItem
     */
    getBoundingMesh(): Mesh;
    setBoundingMesh(mesh: Mesh);
    /**
     * Similar to what `instanceof` could be used for, similar objects should have the same type.
     * E.g room, wall etc.
     */
    type: string;

    neighbours: WorldItem[];
    hasConnectionWith(worldItem: WorldItem): boolean;
    getAllMeshes(): Mesh[];
    parent: WorldItem;

    setPosition(vectorModel: VectorModel): void;

    translate(vectorModel: VectorModel): void;
    getHeight(): number;
    rotateY(amount: number);
    getRotation(): VectorModel;
    /**
     * @deprecated use `getBoundingBox().getBoundingCenter()` and convert that `Point` to a `VectorModel`
     */
    getCenterPosition(): VectorModel;
    getBoundingBox(): Shape;
    setParent(worldItem: WorldItem);
    intersectsPoint(vector: VectorModel);
    intersectsWorldItem(otherWorldItem: WorldItem);
    setVisible(isVisible: boolean): void;
    addChild(worldItem: WorldItem);
}
