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

export class WorldItem<M = any> {
    public mesh: MeshWrapper<M>;
    public name: string;
    public hasDefaultAction = false;

    public materials: {[key: string]: StandardMaterial} = {};

    protected counter = 1;

    constructor(mesh: MeshWrapper<M>, name: string, config?: MeshTemplateConfig) {
        this.mesh = mesh;
        this.name = name;

        if (config) {
            this.initMesh(config);
        }
    }

    public doDefaultAction() {
        throw new Error('No default action defined');
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.name,
            scaling: {
                x: this.mesh.getScale().x,
                y: this.mesh.getScale().y,
                z: this.mesh.getScale().z,
            },
            translate: {
                x: this.mesh.getPosition().x,
                y: this.mesh.getPosition().y,
                z: this.mesh.getPosition().z
            },
            additionalData: {
                rotation: this.mesh.getRotation().y
            }
        };
    }

    public unserialize(model: SerializedMeshModel): WorldItem<M> {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.getId()}-${this.counter++}`);
        const name = this.name;

        const clone = new WorldItem(clonedMesh, name);
        this.copyTo(clone);

        return clone;
    }

    protected copyTo(meshModel: WorldItem<M>): WorldItem<M> {
        meshModel.materials = {...this.materials};
        meshModel.name = this.name;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }

    private initMesh(config: MeshTemplateConfig) {
        this.materials = config.materials;
    }
}
