import { Creature } from "./Creature";
import { Scene, SpotLight, MeshBuilder, Vector3, Mesh } from "babylonjs";


export class Player extends Creature {
    private light: SpotLight;

    constructor(scene: Scene) {
        super();

        var redMat = new BABYLON.StandardMaterial("redMat", scene);
        redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
        this.body = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
        this.body.material = redMat;
        this.body.checkCollisions = true;

        this.light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, 1, 5), Math.PI / 4, 1, scene);
        this.light.diffuse = new BABYLON.Color3(1, 1, 0.6);
        this.light.specular = new BABYLON.Color3(1, 1, 0.6);
        this.light.parent = this.body;

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
}