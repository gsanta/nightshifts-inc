import { Mesh, Skeleton, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';

export interface MeshModelTemplateConfig {
    checkCollisions: boolean;
    receiveShadows: boolean;
    isPickable: boolean;
    scaling: VectorModel;
}

export class MeshModelTemplate {
    private meshes: Mesh[];
    private skeletons: Skeleton[];
    private counter = 1;

    constructor(meshes: Mesh[], skeletons: Skeleton[], material: StandardMaterial, config: MeshModelTemplateConfig) {
        this.meshes = meshes;
        if (material) {
            this.meshes[0].material = material;
        }
        this.meshes[0].checkCollisions = config.checkCollisions;
        this.meshes[0].receiveShadows = config.receiveShadows;
        this.meshes[0].scaling = toVector3(config.scaling);
        this.meshes.forEach(m => m.isPickable = true);
        this.skeletons = skeletons;
    }

    public cloneMeshes(): Mesh[] {
        if (this.counter === 1) {
            this.counter++;
            return this.meshes;
        }

        return this.meshes.map(mesh => mesh.clone(`${mesh.name}-${this.counter++}`));
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
