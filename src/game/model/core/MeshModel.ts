import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from './VectorModel';
import { SerializedMeshModel } from '../../world_serializer/SerializedMeshModel';


export class MeshModel {
    public mesh: Mesh;
    public name: string;
    public hasDefaultAction = false;

    constructor(mesh: Mesh) {
        this.mesh = mesh;
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

    public serialize(): SerializedMeshModel {
        return {
            constructorName: MeshModel.name,
            scaling: null,
            translate: null
        };
    }

    public unserialize(model: SerializedMeshModel): MeshModel {
        return null;
    }
}
