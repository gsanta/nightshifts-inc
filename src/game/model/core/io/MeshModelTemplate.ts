import { Mesh, Skeleton, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';

export interface MeshModelTemplateConfig {
    checkCollisions: boolean;
    receiveShadows: boolean;
    isPickable: boolean;
    scaling: VectorModel;
    singleton: boolean;
}

export class MeshModelTemplate {
    private meshes: Mesh[];
    private skeletons: Skeleton[];
    private counter = 1;
    private config: MeshModelTemplateConfig;

    constructor(meshes: Mesh[], skeletons: Skeleton[], material: StandardMaterial, config: MeshModelTemplateConfig) {
        this.meshes = meshes;
        this.config = config;
        if (material) {
            this.meshes[0].material = material;
        }
        this.meshes[0].checkCollisions = config.checkCollisions;
        this.meshes[0].receiveShadows = config.receiveShadows;
        this.meshes[0].scaling = toVector3(config.scaling);
        this.meshes.forEach(m => {
            m.isPickable = true;
        });

        if (!this.config.singleton) {
            this.meshes[0].setEnabled(false);
        }
        this.skeletons = skeletons;
    }

    public getMeshes() {
        return this.meshes;
    }

    public cloneMeshes(): Mesh[] {
        if (this.config.singleton) {
            return this.meshes;
        }

        return this.meshes.map(mesh => mesh.clone(`${mesh.name}-${this.counter++}`));
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
