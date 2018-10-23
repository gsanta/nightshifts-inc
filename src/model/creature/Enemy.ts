import { Creature } from "./Creature";
import { Scene, MeshBuilder, Vector3, Mesh } from "babylonjs";

export class Enemy extends Creature {
    constructor(scene: Scene) {
        super();

        var redMat = new BABYLON.StandardMaterial("blueMat", scene);
        redMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        this.body = MeshBuilder.CreateSphere("enemy", { diameter: 1 }, scene);
        this.body.material = redMat;
        this.body.checkCollisions = true;
        this.body.position = new Vector3(20, 0, 30);
        var quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0);
        this.body.rotationQuaternion = quaternion;
    }

    public translate(axis: Vector3, distance: number) {
        this.body.translate(axis, distance);
    }

    public rotate(distance: number) {
        this.body.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public getBody(): Mesh {
        return this.body;
    }

    public walk() {
        throw new Error("Method not implemented.");
    }
    public idle() {
        throw new Error("Method not implemented.");
    }
}