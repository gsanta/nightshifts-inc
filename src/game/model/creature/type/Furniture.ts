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
    private static SCALING_OF_BED = 0.04;
    private static SCALING_OF_TABLE = 0.04;

    public static createBed(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = true);

                const mesh = animatedModel.meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_BED, Furniture.SCALING_OF_BED, Furniture.SCALING_OF_BED);

                const material = new BABYLON.StandardMaterial('material01', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const boundingBox = mesh.getBoundingInfo().boundingBox;
                const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
                const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

                const translateX = translate.x() + width / 2;
                const translateZ = translate.z() - depth / 2;
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));
                animatedModel.meshes[1].setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                animatedModel.meshes[1].checkCollisions = true;
                mesh.receiveShadows = true;

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: width, depth: depth, height: 1 },
                    scene
                );

                // box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                return new Furniture(mesh);
            });
    }

    public static createTable(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = true);

                const mesh = animatedModel.meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);

                const material = new BABYLON.StandardMaterial('table-material', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const boundingBox = mesh.getBoundingInfo().boundingBox;
                const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
                const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

                const translateX = translate.x() + width / 2;
                const translateZ = translate.z() - depth / 2;
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                mesh.receiveShadows = true;

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: width, depth: depth, height: 1 },
                    scene
                );

                // box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                return new Furniture(mesh);
            });
    }

    public static createCupboard(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = true);

                const mesh = animatedModel.meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);

                const material = new BABYLON.StandardMaterial('table-material', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const boundingBox = mesh.getBoundingInfo().boundingBox;
                const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
                const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

                const translateX = translate.x() + width / 2;
                const translateZ = translate.z() - depth / 2;
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                mesh.receiveShadows = true;

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: width, depth: depth, height: 1 },
                    scene
                );

                // box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                return new Furniture(mesh);
            });
    }

    public static createCupboardWithShelves(
        scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: AnimatedModel) => {
                animatedModel.meshes.forEach(m => m.isPickable = true);

                const mesh = animatedModel.meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);

                const material = new BABYLON.StandardMaterial('table-material', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const boundingBox = mesh.getBoundingInfo().boundingBox;
                const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
                const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

                const translateX = translate.x() + width / 2;
                const translateZ = translate.z() - depth / 2;
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                mesh.receiveShadows = true;

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: width, depth: depth, height: 1 },
                    scene
                );

                mesh.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);

                // box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                return new Furniture(mesh);
            });
    }
}
