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
            return this.meshes;
        }

        return this.meshes.map(mesh => mesh.clone(`${mesh.name}-${this.counter++}`));
    }

    public createTransformNode(): TransformNode {
        if (this.config.singleton) {
            return this.transformNode;
        }

        return this.transformNode.clone(`${this.transformNode.name}-${this.counter++}`, this.transformNode.parent);
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
