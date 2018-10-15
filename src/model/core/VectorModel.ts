import { Vector3 } from 'babylonjs';


export class VectorModel {
    private vector3: Vector3;

    constructor(x: number, y: number, z: number) {
        this.vector3 = new Vector3(x, y, z);
    }

    public add(vectorModel: VectorModel) {
        this.vector3 = this.vector3.add(vectorModel.vector3);
    }
}