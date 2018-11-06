import { Scene, Mesh } from 'babylonjs';
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
                });
        });

    }
}