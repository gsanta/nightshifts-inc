import { Mesh, SpotLight, MeshBuilder, Scene, Vector3 } from 'babylonjs';


export interface Movable {
    translate(axis: Vector3, distance: number);
    rotate(distance: number);
    getPosition(): Vector3;
    setPotision(position: Vector3);
}

export class Creature implements Movable {
    private body: Mesh;
    private light: SpotLight;

    constructor(scene: Scene) {
        var redMat = new BABYLON.StandardMaterial("redMat", scene);
        redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
        this.body = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
        this.body.material = redMat;
        this.body.checkCollisions = true;

        this.light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, 1, 5), Math.PI / 4, 1, scene);
        this.light.diffuse = new BABYLON.Color3(0, 1, 0);
        this.light.specular = new BABYLON.Color3(0, 1, 0);
        this.light.parent = this.body;
    }

    public translate(axis: Vector3, distance: number) {
        this.body.translate(axis, distance);
        // this.light.position.x = this.body.getAbsolutePosition().x;
        // this.light.position.z = this.body.getAbsolutePosition().z;
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