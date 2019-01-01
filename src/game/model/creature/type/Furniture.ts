import { Creature } from './Creature';
import { Scene, Vector3, Mesh, Light } from 'babylonjs';
import { ModelLoader } from '../../core/io/ModelLoader';
import { AnimatedModel } from '../../core/io/AnimatedModel';
import { VectorModel } from '../../core/VectorModel';
import { UserInputEventEmitter } from '../motion/UserInputEventEmitter';
import { MeshModel } from '../../core/MeshModel';

export class Furniture extends MeshModel {
    private modelLoader: ModelLoader;
    public name = 'furniture';

    constructor(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string) {
        super(null);

        this.modelLoader = new ModelLoader(modelPath, scene);

        this.modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(mesh => mesh.isPickable = false);

                this.mesh = animatedModel.meshes[0];
                this.mesh.scaling = new Vector3(0.05, 0.05, 0.05);

                const material = new BABYLON.StandardMaterial('material01', scene);

                this.mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const vectorsWorld = this.mesh.getBoundingInfo().boundingBox.vectorsWorld;
                const width = Math.abs(vectorsWorld[1].x - (vectorsWorld[0].x));
                const depth = Math.abs(vectorsWorld[1].z - (vectorsWorld[0].z));

                this.mesh.showBoundingBox = true;
                const translateX = translate.x() + width / 2 + 1;
                const translateZ = translate.z() - depth / 2 - 5;
                this.mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                this.mesh.checkCollisions = true;
            });
    }

    public static create(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string) {
        const modelLoader = new ModelLoader(modelPath, scene);


        modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = false);

                const mesh = animatedModel.meshes[0];
                mesh.scaling = new Vector3(0.05, 0.05, 0.05);

                const material = new BABYLON.StandardMaterial('material01', scene);

                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const vectorsWorld = mesh.getBoundingInfo().boundingBox.vectorsWorld;
                const width = Math.abs(vectorsWorld[1].x - (vectorsWorld[0].x));
                const depth = Math.abs(vectorsWorld[1].z - (vectorsWorld[0].z));

                this.mesh.showBoundingBox = true;
                const translateX = translate.x() + width / 2 + 1;
                const translateZ = translate.z() - depth / 2 - 5;
                this.mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                this.mesh.checkCollisions = true;
            });
    }

}
