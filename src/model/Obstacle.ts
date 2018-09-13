import { Mesh, Scene, MeshBuilder, Vector3 } from 'babylonjs';


export class Obstacle {
    private mesh: Mesh;

    constructor(id: number, scene: Scene) {
        var blueMat = new BABYLON.StandardMaterial("blueMat", scene);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        this.mesh = MeshBuilder.CreateBox("obstalce-" + id, { width: 3, depth: 3, height: 5 }, scene);
        this.mesh.material = blueMat;
        this.mesh.translate(new Vector3(20, 0, 20), 1);
        this.mesh.checkCollisions = true;
    }
}