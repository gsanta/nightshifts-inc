import { Mesh, Skeleton, StandardMaterial, TransformNode } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';

export interface MeshConfig {
    name: string;
    meshes: Mesh[];
    materials: {default: StandardMaterial, dark: StandardMaterial};
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
    private config: MeshConfig;
    private containerMesh: Mesh;

    constructor(containerMesh: Mesh, meshes: Mesh[], skeletons: Skeleton[], config: MeshConfig) {
        this.containerMesh = containerMesh;
        this.meshes = meshes;
        this.config = config;

        this.meshes.forEach(m => {
            m.isPickable = true;
            m.isVisible = false;
            m.checkCollisions = config.checkCollisions;
            m.receiveShadows = config.receiveShadows;
            m.scaling = toVector3(config.scaling);
        });

        if (!this.config.singleton) {
            this.meshes.forEach(m => m.setEnabled(false));
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

        if (this.containerMesh) {
            return this.cloneMeshesAndPutUnderContainer();
        } else {
            return this.cloneMeshes();
        }
    }

    private cloneMeshes() {
        return this.meshes.map(mesh => {
            const clonedMesh = mesh.clone(`${mesh.name}-${this.counter++}`);
            clonedMesh.isVisible = true;
            return clonedMesh;
        });
    }

    private cloneMeshesAndPutUnderContainer() {
        const containerMesh = this.containerMesh.clone(`${this.containerMesh.name}-${this.counter++}`);
        containerMesh.isVisible = false;

        const meshes = this.cloneMeshes();

        meshes.forEach(mesh => mesh.parent = containerMesh);

        return [containerMesh, ...meshes];
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
