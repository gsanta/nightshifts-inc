import { Mesh, Skeleton, StandardMaterial, TransformNode } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';

export interface MeshTemplateConfig {
    checkCollisions: boolean;
    receiveShadows: boolean;
    isPickable: boolean;
    scaling: VectorModel;
    singleton: boolean;
}

export class MeshTemplate {
    private meshes: Mesh[];
    private skeletons: Skeleton[];
    private counter = 1;
    private config: MeshTemplateConfig;
    private transformNode: TransformNode;

    constructor(meshes: Mesh[], skeletons: Skeleton[], transformNode: TransformNode, material: StandardMaterial, config: MeshTemplateConfig) {
        this.meshes = meshes;
        this.transformNode = transformNode;
        this.config = config;
        if (material) {
            this.meshes[0].material = material;
        }
        this.meshes[0].checkCollisions = config.checkCollisions;
        this.meshes[0].receiveShadows = config.receiveShadows;
        this.meshes[0].scaling = toVector3(config.scaling);
        this.meshes.forEach(m => {
            m.isPickable = true;
            m.isVisible = false;
        });

        if (!this.config.singleton) {
            this.meshes[0].setEnabled(false);
        }
        this.skeletons = skeletons;
    }

    public getMeshes() {
        return this.meshes;
    }

    public createMeshes(): Mesh[] {
        if (this.config.singleton) {
            this.meshes.forEach(mesh => mesh.isVisible = true);
            return this.meshes;
        }

        const meshes = this.meshes.map(mesh => {
            const clonedMesh = mesh.clone(`${mesh.name}-${this.counter++}`);
            clonedMesh.isVisible = true;
            return clonedMesh;
        });

        if (meshes.length > 1) {
            const [first, ...rest] = meshes;
            rest.forEach(mesh => mesh.parent = first);
            first.isVisible = false;
        }

        return meshes;
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}