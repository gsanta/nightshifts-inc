import { Vector3 } from 'babylonjs';

export const toVector3 = (vectorModel: VectorModel) => {
    return new Vector3(vectorModel.x, vectorModel.y, vectorModel.z);
}
export class VectorModel {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(vectorModel: VectorModel) {
        const vector3 = this.toVector3().add(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z));
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public multiply(vectorModel: VectorModel) {
        const vector3 = this.toVector3().multiply(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z));
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public subtract(vectorModel: VectorModel) {
        const vector3 = this.toVector3().subtract(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z));
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public scale(quantity: number) {
        const vector3 = this.toVector3().scale(quantity);
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public negate() {
        const vector3 = this.toVector3().negate();
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public normalize() {
        const vector3 = this.toVector3().normalize();
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    public length() {
        return this.toVector3().length();
    }

    public clone(): VectorModel {
        return new VectorModel(this.x, this.y, this.z);
    }

    public addX(x: number) {
        this.x += x;
    }

    public addY(y: number) {
        this.y += y;
    }

    public addZ(z: number) {
        this.z += z;
    }

    public getAngleToVectorOnXZPlane(otherVector: VectorModel) {
        return BABYLON.Vector3.GetAngleBetweenVectors(
            new Vector3(this.x, this.y, this.z),
            new Vector3(otherVector.x, otherVector.y, otherVector.z),
            new Vector3(0, 1, 0)
        );
    }

    public static Distance(vectorModel1: VectorModel, vectorModel2: VectorModel) {
        return Vector3.Distance(toVector3(vectorModel1), toVector3(vectorModel2));
    }

    public serialize(): {x: number, y: number, z: number} {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }

    public static deserialize(obj: {x: number, y: number, z: number}) {
        return new VectorModel(obj.x, obj.y, obj.z);
    }

    private toVector3(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
}
