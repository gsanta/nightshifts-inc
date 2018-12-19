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

    public createWall(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const blueMat = new BABYLON.StandardMaterial('blueMat', this.scene);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        const mesh = MeshBuilder.CreateBox(
            'wall-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() },
            this.scene
        );

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.wallMaterial;
        mesh.receiveShadows = true;

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(mesh);
        }

        meshModel.name = 'wall';

        return meshModel;
    }

    public createWindow(translate: VectorModel, dimensions: VectorModel): MeshModel {
        return this.createWall(translate, dimensions);
    }


    public createDoor(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const meshModel = this.createWall(translate, dimensions);
        meshModel.name = 'door';
        return meshModel;
    }

    public createFloor(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', this.scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture('../models/floor_texture.jpg', this.scene);

        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: dimensions.x(), height: dimensions.y() },
            this.scene
        );
        ground.receiveShadows = true;
        ground.material = groundMaterial;

        const meshModel = new MeshModel(ground);
        meshModel.name = 'floor';
        translate.setX(dimensions.x() / 2);
        meshModel.translate(translate);

        return meshModel;
    }
}
