import { Scene, Mesh, AbstractMesh, ParticleSystem, Skeleton, AnimationGroup, StandardMaterial } from 'babylonjs';
import {Promise} from 'es6-promise';
import { MeshTemplate, MeshConfig } from '../MeshTemplate';
import { VectorModel } from '../../VectorModel';
import { AsyncTemplateCreator } from '../AsyncTemplateCreator';
import { MeshModel } from '../../MeshModel';

export const defaultMeshConfig: MeshConfig = {
    checkCollisions: true,
    receiveShadows: true,
    isPickable: true,
    scaling: new VectorModel(1, 1, 1),
    singleton: false
};

/**
 * Loads the model information from file, and creates the `MeshTemplate` based on the loaded `Mesh`.
 */
export abstract class ModelFileBasedTemplateCreator implements AsyncTemplateCreator {
    private base: string;
    protected scene: Scene;
    private fileName: string;
    protected config: MeshConfig;

    protected meshes: Mesh[];
    protected skeletons: Skeleton[];
    protected materials: StandardMaterial[] = [];
    protected isAsyncWorkDone = false;

    constructor(scene: Scene, base: string, fileName: string, materialFileNames: string[], config: Partial<MeshConfig>) {
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

    public abstract create(): MeshModel;
}
