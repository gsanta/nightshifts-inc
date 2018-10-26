import { Vector3 } from 'babylonjs';

export const toVector3 = (vectorModel: VectorModel) => {
    return new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z());
}
export class VectorModel {
    private vector3: Vector3;

    constructor(x: number, y: number, z: number) {
        this.vector3 = new Vector3(x, y, z);
    }

    public add(vectorModel: VectorModel) {
        const vector3 = this.vector3.add(vectorModel.vector3);
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public multiply(vectorModel: VectorModel) {
        const vector3 = this.vector3.multiply(vectorModel.vector3);
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public subtract(vectorModel: VectorModel) {
        const vector3 = this.vector3.subtract(vectorModel.vector3);
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public scale(quantity: number) {
        const vector3 = this.vector3.scale(quantity);
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public negate() {
        const vector3 = this.vector3.negate();
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public normalize() {
        const vector3 = this.vector3.normalize();
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public length() {
        return this.vector3.length();
    }

    public clone(): VectorModel {
        return new VectorModel(this.x(), this.y(), this.z());
    }

    public x() {
        return this.vector3.x;
    }

    public y() {
        return this.vector3.y;
    }

    public z() {
        return this.vector3.z;
    }

    public setX(x: number) {
        this.vector3.x += x;
    }

    public setY(y: number) {
        this.vector3.y += y;
    }

    public setZ(z: number) {
        this.vector3.z += z;
    }

    public getAngleToVectorOnXZPlane(otherVector: VectorModel) {
        return BABYLON.Vector3.GetAngleBetweenVectors(
            new Vector3(this.x(), this.y(), this.z()),
            new Vector3(otherVector.x(), otherVector.y(), otherVector.z()),
            new Vector3(0, 1, 0)
        );
    }
}