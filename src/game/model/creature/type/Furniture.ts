import { Creature } from './Creature';
import { Scene, Vector3, Mesh, Light, MeshBuilder } from 'babylonjs';
import { ModelLoader } from '../../core/io/ModelLoader';
import { AnimatedModel } from '../../core/io/AnimatedModel';
import { VectorModel } from '../../core/VectorModel';
import { UserInputEventEmitter } from '../motion/UserInputEventEmitter';
import { MeshModel } from '../../core/MeshModel';
import {Promise} from 'es6-promise';

export class Furniture extends MeshModel {
    public name = 'furniture';

    public static create(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = true);

                const mesh = animatedModel.meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(0.05, 0.05, 0.05);

                const material = new BABYLON.StandardMaterial('material01', scene);

                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const vectorsWorld = mesh.getBoundingInfo().boundingBox.vectorsWorld;
                const width = Math.abs(vectorsWorld[1].x - (vectorsWorld[0].x));
                const depth = Math.abs(vectorsWorld[1].z - (vectorsWorld[0].z));

                const translateX = translate.x() + width / 2 + 1;
                const translateZ = translate.z() - depth / 2 - 5;
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));
                animatedModel.meshes[1].setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                animatedModel.meshes[1].checkCollisions = true;
                mesh.receiveShadows = true;

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: 5.2, depth: 11.4, height: 1 },
                    scene
                );

                box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                return new Furniture(mesh);
            });
    }

}
