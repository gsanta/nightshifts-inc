import { Mesh, Scene, MeshBuilder, Vector3 } from 'babylonjs';


export class Obstacle {
    private mesh: Mesh;

    constructor(id: number, scene: Scene, translate: Vector3, dimensions: Vector3) {
        var blueMat = new BABYLON.StandardMaterial("blueMat", scene);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        this.mesh = MeshBuilder.CreateBox(
            "obstalce-" + id,
            { width: dimensions.x, depth: dimensions.z, height: dimensions.y },
            scene
        );
        this.mesh.material = blueMat;
        this.mesh.translate(translate, 1);
        this.mesh.checkCollisions = true;
    }

    public getBody(): Mesh {
        return this.mesh;
    }
}