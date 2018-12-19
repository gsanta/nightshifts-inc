import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from './VectorModel';


export class MeshModel {
    private mesh: Mesh;
    public name: string;

    constructor(mesh: Mesh) {
        this.mesh = mesh;
    }

    public translate(vectorModel: VectorModel) {
        this.mesh.translate(new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z()), 1);
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x(), vector.y(), vector.z()));
    }

    public getBody(): Mesh {
        return this.mesh;
    }
}
