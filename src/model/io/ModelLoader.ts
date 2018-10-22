import { Scene, Mesh } from 'babylonjs';
import { MeshModel } from '../core/MeshModel';
import {Promise} from 'es6-promise';
import { AnimatedModel } from './AnimatedModel';

export class ModelLoader {
    private base: string;
    private scene: Scene;

    constructor(base: string, scene: Scene) {
        this.base = base;
        this.scene = scene;
    }

    public load(fileName: string): Promise<AnimatedModel> {
        return new Promise((resolve, reject) => {

            BABYLON.SceneLoader.ImportMesh(
                "",
                this.base,
                fileName,
                this.scene,
                (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[], animationGroups: BABYLON.AnimationGroup[]) => {
                    
                    resolve({
                        meshes: <Mesh[]> meshes,
                        skeletons: skeletons
                    });
                    // meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
                    // scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
                    // that.body = meshes[0];
                    // that.body.checkCollisions = true;
                    // var quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
                    // that.body.rotationQuaternion = quaternion;
                    // that.light.parent = that.body;
                });
        });

    }
}