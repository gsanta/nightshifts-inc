import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from './VectorModel';


export class MeshModel {
    protected mesh: Mesh;
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
}
