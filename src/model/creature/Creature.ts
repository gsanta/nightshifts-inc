import { Mesh, SpotLight, MeshBuilder, Scene, Vector3 } from 'babylonjs';


export interface Movable {
    translate(axis: Vector3, distance: number);
    rotate(distance: number);
    getPosition(): Vector3;
    setPotision(position: Vector3);
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

    public getPosition(): Vector3 {
        return this.body.position;
    }

    public setPotision(position: Vector3) {
        this.body.position = position;
    }
}