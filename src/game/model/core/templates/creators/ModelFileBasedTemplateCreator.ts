import { Scene, Mesh, AbstractMesh, ParticleSystem, Skeleton, AnimationGroup, StandardMaterial } from 'babylonjs';
import {Promise} from 'es6-promise';
import { MeshTemplate, MeshTemplateConfig } from '../MeshTemplate';
import { VectorModel } from '../../VectorModel';
import { AsyncTemplateCreator } from '../AsyncTemplateCreator';

export const defaultMeshConfig: MeshTemplateConfig = {
    checkCollisions: true,
    receiveShadows: true,
    isPickable: true,
    scaling: new VectorModel(1, 1, 1),
    singleton: false
};

/**
 * Loads the model information from file, and creates the `MeshTemplate` based on the loaded `Mesh`.
 */
export class ModelFileBasedTemplateCreator implements AsyncTemplateCreator {
    private base: string;
    private scene: Scene;
    private fileName: string;
    private config: MeshTemplateConfig;

    private meshes: Mesh[];
    private skeletons: Skeleton[];
    private materials: StandardMaterial[] = [];
    private isAsyncWorkDone = false;

    constructor(scene: Scene, base: string, fileName: string, materialFileNames: string[], config: Partial<MeshTemplateConfig>) {
        this.base = base;
        this.scene = scene;
        this.fileName = fileName;
        this.config = {...defaultMeshConfig, ...config};

        materialFileNames.forEach((file, index) => {
            this.materials[index] = new BABYLON.StandardMaterial(file, scene);
            this.materials[index].diffuseTexture = new BABYLON.Texture(file, scene);
        });
    }

    public doAsyncWork(): Promise<void> {
        return new Promise(resolve => {
            const onSuccess = (meshes: AbstractMesh[], ps: ParticleSystem[], skeletons: Skeleton[], ag: AnimationGroup[]) => {
                this.meshes = <Mesh[]> meshes;
                this.skeletons = skeletons;
                this.isAsyncWorkDone = true;
                resolve();
            };

            const onError = (scene: Scene, message: string) => {
                throw new Error(message);
            };

            BABYLON.SceneLoader.ImportMesh(
                '',
                this.base,
                this.fileName,
                this.scene,
                onSuccess,
                () => {},
                onError
            );
        });
    }

    public create(): MeshTemplate {
        if (!this.isAsyncWorkDone) {
            throw new Error(`This is an AsyncTemplateCreator and the async work is not done yet,
                call and wait for doAsyncWork() before calling this method.`);
        }

        this.meshes.forEach(m => m.material = this.materials[0]);

        return new MeshTemplate(null, this.meshes, this.skeletons, this.config);
    }
}
