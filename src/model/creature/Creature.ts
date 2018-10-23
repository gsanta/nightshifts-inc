import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';


export abstract class Creature {
    protected body: Mesh;

    public translate(axis: Vector3, distance: number) {
        this.body.translate(axis, distance);
    }

    public rotate(distance: number) {
        this.body.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public getBody(): Mesh {
        return this.body;
    }

    public getPosition(): VectorModel {
        return new VectorModel(this.body.position.x, this.body.position.y, this.body.position.z);
    }

    public setPosition(position: VectorModel) {
        this.body.position = new Vector3(position.x(), position.y(), position.z());
    }

    public getWorldMatrixArray(): Float32Array {
        return this.body.getWorldMatrix().toArray();
    }

    public abstract walk();
    public abstract idle();
    public setIsVisible(isVisible: boolean) {};
}