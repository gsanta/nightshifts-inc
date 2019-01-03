import { Creature } from './Creature';
import { Scene, Vector3, Mesh, Light, MeshBuilder, BoundingBox, StandardMaterial } from 'babylonjs';
import { ModelLoader } from '../../core/io/ModelLoader';
import { MeshModelTemplate } from '../../core/io/MeshModelTemplate';
import { VectorModel, toVector3 } from '../../core/VectorModel';
import { UserInputEventEmitter } from '../motion/UserInputEventEmitter';
import { MeshModel } from '../../core/MeshModel';
import {Promise} from 'es6-promise';
import { Orientation } from '../../utils/Orientation';

export class Furniture extends MeshModel {
    public name = 'furniture';
    private static SCALING_OF_TABLE = 0.04;

    public static createBed(scene: Scene, translate: VectorModel, model: MeshModelTemplate): Furniture {
        const meshes = model.cloneMeshes();
        meshes.forEach(m => m.isPickable = true);

        const mesh = meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
        const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

        const translateX = translate.x() + width / 2;
        const translateZ = translate.z() - depth / 2;
        const adjustedTranslate = new VectorModel(translateX, translate.y(), translateZ);
        mesh.setAbsolutePosition(toVector3(adjustedTranslate));
        meshes[1].setAbsolutePosition(toVector3(adjustedTranslate));
        meshes[1].checkCollisions = true;

        this.createCollisionBoxForMesh(mesh, scene, width, depth, adjustedTranslate);

        return new Furniture(mesh);
    }

    public static createTable(scene: Scene, translate: VectorModel, model: MeshModelTemplate): Furniture {
        const meshes = model.cloneMeshes();
        meshes.forEach(m => m.isPickable = true);

        const mesh = meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
        const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

        const translateX = translate.x() + width / 2;
        const translateZ = translate.z() - depth / 2;

        const adjustedTranslate = new VectorModel(translateX, translate.y(), translateZ);
        mesh.setAbsolutePosition(toVector3(adjustedTranslate));

        this.createCollisionBoxForMesh(mesh, scene, width, depth, adjustedTranslate);

        return new Furniture(mesh);
    }

    public static createTableWide(scene: Scene, translate: VectorModel, model: MeshModelTemplate): Furniture {
        const meshes = model.cloneMeshes();
        meshes.forEach(m => m.isPickable = true);

        const mesh = meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
        const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

        const translateX = translate.x() + width / 2;
        const translateZ = translate.z() - depth / 2;
        const adjustedTranslate = new VectorModel(translateX, translate.y(), translateZ);

        mesh.setAbsolutePosition(toVector3(adjustedTranslate));

        this.createCollisionBoxForMesh(mesh, scene, width, depth, adjustedTranslate);

        return new Furniture(mesh);
    }

    public static createCupboard(scene: Scene, translate: VectorModel, model: MeshModelTemplate): Furniture {
        const meshes = model.cloneMeshes();
        const mesh = meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
        const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

        const translateX = translate.x() + width / 2;
        const translateZ = translate.z() - depth / 2;
        const adjustedTranslate = new VectorModel(translateX, translate.y(), translateZ);

        mesh.setAbsolutePosition(toVector3(adjustedTranslate));
        this.createCollisionBoxForMesh(mesh, scene, width, depth, adjustedTranslate);

        return new Furniture(mesh);
    }

    private static createCollisionBoxForMesh(mesh: Mesh, scene: Scene, width: number, depth: number, translate: VectorModel) {
        const box = MeshBuilder.CreateBox(
            'box',
            { width: width, depth: depth, height: 1 },
            scene
        );

        box.setAbsolutePosition(toVector3(translate));
        return box;
    }

    public static createCupboardWithShelves(scene: Scene, translate: VectorModel, model: MeshModelTemplate, orientation: Orientation): Furniture {
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
        };

        const meshes = model.cloneMeshes();
        meshes.forEach(m => m.isPickable = true);

        const mesh = meshes[0];

        const boundingBox = mesh.getBoundingInfo().boundingBox;
        const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
        const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

        const translateX = getTranslateX(translate, orientation, boundingBox, mesh);
        const translateZ = getTranslateZ(translate, orientation, boundingBox, mesh);
        const adjustedTranslate = new VectorModel(translateX, translate.y(), translateZ);

        mesh.setAbsolutePosition(toVector3(adjustedTranslate));
        mesh.rotate(BABYLON.Axis.Y, this.getRotationForOrientation(orientation), BABYLON.Space.WORLD);

        const box = this.createCollisionBoxForMesh(mesh, scene, width, depth, adjustedTranslate);

        box.rotate(BABYLON.Axis.Y, this.getRotationForOrientation(orientation), BABYLON.Space.WORLD)

        return new Furniture(mesh);
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
