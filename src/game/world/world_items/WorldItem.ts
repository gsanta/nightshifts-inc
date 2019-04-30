import { Mesh, Vector3, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { Polygon } from 'game-worldmap-generator';

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

    /**
     * Rotates around the `WorldItem`s center at the given axis with the given amont
     */
    rotateAtCenter(vectorModel: VectorModel, amount: number): void;

    translate(vectorModel: VectorModel): void;
    /**
     * scales the underlying Mesh (or Mesh system if it is a `ContainerWorldItem`) on the x, y, z plane given
     * the corresponding coordinates of the `VectorModel` parameter.
     */
    scale(vectorModel: VectorModel): void;
    getScale(): VectorModel;
    getRotation(): VectorModel;
    getCenterPosition(): VectorModel;
    getBoundingPolygon(): Polygon;
    getAbsoluteBoundingPolygon(): Polygon;
    setParent(worldItem: WorldItem);
    intersectsPoint(vector: VectorModel);
}
