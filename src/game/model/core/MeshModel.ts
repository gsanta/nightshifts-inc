import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from './VectorModel';

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
}

export class MeshModel {
    public mesh: Mesh;
    public name: string;
    public hasDefaultAction = false;

    constructor(mesh: Mesh, name: string) {
        this.mesh = mesh;
        this.name = name;
    }

    public translate(vectorModel: VectorModel) {
        this.mesh.translate(new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z()), 1);
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x(), vector.y(), vector.z()));
    }

    public getPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public doDefaultAction() {
        throw new Error('No default action defined');
    }

    public getXExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.x;
    }

    public getYExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.y;
    }

    public getZExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.z;
    }

    public getScale(): VectorModel {
        return new VectorModel(this.mesh.scaling.x, this.mesh.scaling.y, this.mesh.scaling.z);
    }

    public serialize(): SerializedMeshModel {
        return {
            name: MeshModel.name,
            scaling: null,
            translate: null
        };
    }

    public unserialize(model: SerializedMeshModel): MeshModel {
        return null;
    }
}
