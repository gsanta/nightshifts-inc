import { Scene, Mesh, AbstractMesh, ParticleSystem, Skeleton, AnimationGroup, StandardMaterial } from 'babylonjs';
import {Promise} from 'es6-promise';
import { MeshModelTemplate, MeshModelTemplateConfig } from './MeshModelTemplate';
import { VectorModel } from '../VectorModel';

export const defaultMeshConfig: MeshModelTemplateConfig = {
    checkCollisions: true,
    receiveShadows: true,
    isPickable: true,
    scaling: new VectorModel(1, 1, 1),
    singleton: false
}

export class ModelLoader {
    private base: string;
    private scene: Scene;

    constructor(base: string, scene: Scene) {
        this.base = base;
        this.scene = scene;
    }

    public load(fileName: string, material: StandardMaterial, config: Partial<MeshModelTemplateConfig>): Promise<MeshModelTemplate> {

        const mergedConfig = {...defaultMeshConfig, ...config};
        return new Promise(resolve => {
            BABYLON.SceneLoader.ImportMesh(
                '',
                this.base,
                fileName,
                this.scene,
                (meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[]) => {
                    resolve(new MeshModelTemplate(<Mesh[]> meshes, skeletons, material, mergedConfig));
                },
                () => {},
                (scene: Scene, message: string) => {
                    throw new Error(message);
                }
            );
        });

    }
}