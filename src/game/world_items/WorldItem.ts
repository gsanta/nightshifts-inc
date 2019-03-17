import { Mesh, Vector3, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from '../model/core/VectorModel';
import { MeshTemplateConfig } from '../model/core/templates/MeshTemplate';
import { MeshWrapper } from '../../engine/wrappers/MeshWrapper';

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
    mesh?: MeshWrapper<any>;
    name?: string;
    hasDefaultAction: boolean;
    materials: {[key: string]: StandardMaterial};

    // protected counter = 1;

    // constructor(mesh: MeshWrapper<M>, name: string, config?: MeshTemplateConfig) {
    //     this.mesh = mesh;
    //     this.name = name;

    //     if (config) {
    //         this.initMesh(config);
    //     }
    // }

    doDefaultAction();
    serialize(): SerializedMeshModel;
    unserialize(model: SerializedMeshModel): WorldItem;
    clone();
}
