import { Mesh, StandardMaterial } from '@babylonjs/core';
import { VectorModel } from '../../model/core/VectorModel';
import { Polygon } from '@nightshifts.inc/geometry';

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
    mesh?: Mesh;
    /**
     * The enclosing bounding box of the mesh, for optimization reasons it can be null and we calculate it only
     * for debugging purposes.
     */
    boundingBox?: Mesh;
    /**
     * Similar to what `instanceof` could be used for, similar objects should have the same type.
     * E.g room, wall etc.
     */
    type: string;
    /**
     * A human-readable name that uniquely identifies the item
     */
    name?: string;
    hasDefaultAction: boolean;
    material: StandardMaterial;
    neighbours: WorldItem[];
    getAllMeshes(): Mesh[];
    parent: WorldItem;
    doDefaultAction();
    serialize(): SerializedMeshModel;
    unserialize(model: SerializedMeshModel): WorldItem;
    clone();

    setPosition(vectorModel: VectorModel): void;

    translate(vectorModel: VectorModel): void;
    /**
     * scales the underlying Mesh (or Mesh system if it is a `ContainerWorldItem`) on the x, y, z plane given
     * the corresponding coordinates of the `VectorModel` parameter.
     */
    scale(vectorModel: VectorModel): void;
    getScale(): VectorModel;
    rotateY(amount: number);
    getRotation(): VectorModel;
    getCenterPosition(): VectorModel;
    getBoundingPolygon(): Polygon;
    getAbsoluteBoundingPolygon(): Polygon;
    setParent(worldItem: WorldItem);
    intersectsPoint(vector: VectorModel);
    intersectsWorldItem(otherWorldItem: WorldItem);
    setVisible(isVisible: boolean): void;
}
