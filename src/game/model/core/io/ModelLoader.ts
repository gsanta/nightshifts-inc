import { Scene, Mesh, AbstractMesh, ParticleSystem, Skeleton, AnimationGroup } from 'babylonjs';
import {Promise} from 'es6-promise';
import { MeshModelTemplate } from './MeshModelTemplate';

export class ModelLoader {
    private base: string;
    private scene: Scene;

    constructor(base: string, scene: Scene) {
        this.base = base;
        this.scene = scene;
    }

    public load(fileName: string): Promise<MeshModelTemplate> {
        return new Promise(resolve => {
            BABYLON.SceneLoader.ImportMesh(
                '',
                this.base,
                fileName,
                this.scene,
                (meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[]) => {
                    resolve(new MeshModelTemplate(<Mesh[]> meshes, skeletons));
                },
                () => {},
                (scene: Scene, message: string) => {
                    throw new Error(message);
                }
            );
        });

    }
}