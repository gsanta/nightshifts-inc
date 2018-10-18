import { Creature } from "./Creature";
import { Scene, SpotLight, MeshBuilder, Vector3, Mesh, Light } from "babylonjs";


export class Player extends Creature {
    private light: Light;

    constructor(scene: Scene, light: Light) {
        super();

        var redMat = new BABYLON.StandardMaterial("redMat", scene);
        redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
        this.body = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
        this.body.material = redMat;
        this.body.checkCollisions = true;

        this.light = light;
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