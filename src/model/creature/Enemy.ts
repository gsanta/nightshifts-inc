import { Creature } from "./Creature";
import { Scene, MeshBuilder, Vector3, Mesh, StandardMaterial } from 'babylonjs';
declare const DEBUG; 

export class Enemy extends Creature {
    private visibleMaterial: StandardMaterial = null;
    private inVisibleMaterial: StandardMaterial = null;
    private scene: Scene;
    private isVisible = true;

    constructor(scene: Scene) {
        super();
        this.scene = scene;

        console.log('debug: ' + DEBUG)

        this.initMaterials();
        this.body = MeshBuilder.CreateSphere("enemy", { diameter: 3 }, scene);

        this.body.material = this.visibleMaterial;
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

    public setIsVisible(isVisible: boolean) {
        if (this.isVisible === isVisible) {
            return;
        }

        this.isVisible = isVisible;

        if (isVisible) {
            this.body.material = this.visibleMaterial;
        } else {
            this.body.material = this.inVisibleMaterial;
        }
    }

    private initMaterials() {
        this.visibleMaterial = new StandardMaterial("enemy-visible-material", this.scene);
        this.visibleMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

        this.inVisibleMaterial = new StandardMaterial("enemy-non-visible-material", this.scene);
        this.inVisibleMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

        if (DEBUG) {
            this.inVisibleMaterial.alpha = 0.1;
        } else {
            this.inVisibleMaterial.alpha = 0;
        }
    }
}