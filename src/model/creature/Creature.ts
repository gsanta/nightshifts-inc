import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';


export interface Movable {
    translate(axis: Vector3, distance: number);
    rotate(distance: number);
    getPosition(): VectorModel;
    setPosition(position: VectorModel);
}

export class Creature implements Movable {
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
}