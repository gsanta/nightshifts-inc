import { Creature } from './Creature';
import { Scene, Vector3, Mesh, Light, MeshBuilder, BoundingBox, StandardMaterial } from 'babylonjs';
import { ModelLoader } from '../../core/io/ModelLoader';
import { MeshModelTemplate } from '../../core/io/MeshModelTemplate';
import { VectorModel } from '../../core/VectorModel';
import { UserInputEventEmitter } from '../motion/UserInputEventEmitter';
import { MeshModel } from '../../core/MeshModel';
import {Promise} from 'es6-promise';
import { Orientation } from '../../utils/Orientation';

export class Furniture extends MeshModel {
    public name = 'furniture';
    private static SCALING_OF_BED = 0.04;
    private static SCALING_OF_TABLE = 0.04;
    private static MODEL_PATH = '/models/furniture/';

    public static createBed(scene: Scene, translate: VectorModel, modelPath: string, modelName: string, textureName: string): Promise<Furniture> {
        const modelLoader = new ModelLoader(modelPath, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: MeshModelTemplate) => {
                const meshes = animatedModel.cloneMeshes();
                meshes.forEach(m => m.isPickable = true);

                const mesh = meshes[0];
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
                meshes[1].setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                meshes[1].checkCollisions = true;
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
            .then((animatedModel: MeshModelTemplate) => {
                const meshes = animatedModel.cloneMeshes();
                meshes.forEach(m => m.isPickable = true);

                const mesh = meshes[0];

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

    public static createTableWide(scene: Scene, translate: VectorModel): Promise<Furniture> {
        const modelName = 'table_wide.babylon';
        const textureName = 'furniture.png';
        const modelLoader = new ModelLoader(this.MODEL_PATH, scene);

        return modelLoader.load(modelName)
            .then((animatedModel: MeshModelTemplate) => {
                const meshes = animatedModel.cloneMeshes();
                meshes.forEach(m => m.isPickable = true);

                const mesh = meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);

                const material = new BABYLON.StandardMaterial('table-material', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`${this.MODEL_PATH}/${textureName}`, scene);

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

    public static createCupboard(scene: Scene, translate: VectorModel, model: MeshModelTemplate, material: StandardMaterial): Furniture {
        const meshes = model.cloneMeshes();

        meshes.forEach(m => m.isPickable = true);

        const mesh = meshes[0];
        mesh.name = 'furniture';
        mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);
        mesh.material = material;

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
    }

    private static setMeshData(mesh: Mesh, name: string) {

    }

    public static createCupboardWithShelves(scene: Scene, translate: VectorModel, orientation: Orientation): Promise<Furniture> {
        const modelPath = '/models/furniture/';
        const modelName = 'cupboard_shelves.babylon';
        const textureName = 'furniture.png';
        const modelLoader = new ModelLoader(modelPath, scene);

        const getTranslateZ = (centerPointTranslate: VectorModel, orientation: Orientation, boundingBox: BoundingBox, mesh: Mesh) => {
            const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

            switch(orientation) {
                case Orientation.SOUTH:
                    return centerPointTranslate.z();
                case Orientation.NORTH:
                    return centerPointTranslate.z();
                case Orientation.EAST:
                    return centerPointTranslate.z();
                case Orientation.WEST:
                    return centerPointTranslate.z() - depth;
                default:
                    throw new Error('Illegal orientation: ' + orientation);
            }
        };

        const getTranslateX = (centerPointTranslate: VectorModel, orientation: Orientation, boundingBox: BoundingBox, mesh: Mesh) => {
            const width = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.x;

            switch(orientation) {
                case Orientation.SOUTH:
                    return centerPointTranslate.x();
                case Orientation.NORTH:
                    return centerPointTranslate.x();
                case Orientation.EAST:
                    return centerPointTranslate.x();
                case Orientation.WEST:
                    return centerPointTranslate.x() - 0.5;
                default:
                    throw new Error('Illegal orientation: ' + orientation);
            }
        }

        return modelLoader.load(modelName)
            .then((animatedModel: MeshModelTemplate) => {
                const meshes = animatedModel.cloneMeshes();
                meshes.forEach(m => m.isPickable = true);

                const mesh = meshes[0];
                mesh.name = 'furniture';
                mesh.scaling = new Vector3(Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE, Furniture.SCALING_OF_TABLE);

                const material = new BABYLON.StandardMaterial('table-material', scene);
                mesh.material = material;
                material.diffuseTexture = new BABYLON.Texture(`models/furniture/${textureName}`, scene);

                const boundingBox = mesh.getBoundingInfo().boundingBox;
                const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
                const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

                const translateX = getTranslateX(translate, orientation, boundingBox, mesh);
                const translateZ = getTranslateZ(translate, orientation, boundingBox, mesh);
                mesh.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));

                mesh.checkCollisions = true;
                mesh.receiveShadows = true;
                mesh.rotate(BABYLON.Axis.Y, this.getRotationForOrientation(orientation), BABYLON.Space.WORLD);

                const box = MeshBuilder.CreateBox(
                    'box',
                    { width: width, depth: depth, height: 1 },
                    scene
                );


                // box.visibility = 0;

                box.setAbsolutePosition(new Vector3(translateX, translate.y(), translateZ));
                box.rotate(BABYLON.Axis.Y, this.getRotationForOrientation(orientation), BABYLON.Space.WORLD)

                return new Furniture(mesh);
            });
    }

    private static getRotationForOrientation(orientation: Orientation) {
        switch(orientation) {
            case Orientation.SOUTH:
                return 0;
            case Orientation.NORTH:
             return Math.PI;
            case Orientation.EAST:
                return 3 * Math.PI / 2;
            case Orientation.WEST:
                return Math.PI / 2;
            default:
                throw new Error('Illegal orientation: ' + orientation);
        }
    }
}
