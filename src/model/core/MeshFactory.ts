import { StandardMaterial, Scene, MeshBuilder, ShadowGenerator } from 'babylonjs';
import { VectorModel } from './VectorModel';
import { MeshModel } from './MeshModel';

export class MeshFactory {
    private wallMaterial: StandardMaterial;
    private scene: Scene;
    private shadowGenerator: ShadowGenerator;
    private idCounter = 0;

    constructor(scene: Scene, wallMaterial: StandardMaterial, shadowGenerator: ShadowGenerator) {
        this.wallMaterial = wallMaterial;
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
    }

    public createWall(translate: VectorModel, dimensions: VectorModel) {
        var blueMat = new BABYLON.StandardMaterial("blueMat", this.scene);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        const mesh = MeshBuilder.CreateBox(
            "wall-" + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() },
            this.scene
        );

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.wallMaterial;
        mesh.receiveShadows = true;

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }
}