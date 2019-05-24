import { Mesh, Skeleton, Scene, MeshBuilder, Vector3, Space, StandardMaterial, Color3 } from '@babylonjs/core';


export class MeshFactory {
    private meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }

    public createMesh(): [Mesh[], Skeleton[]] {
        const meshes = this.meshInfo[0].map(mesh => mesh.clone(`${this.meshInfo[0][0].name}`));
        meshes[0].isVisible = true;

        return [meshes, this.meshInfo[1]];
    }
}
