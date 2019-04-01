import { Mesh, Skeleton, StandardMaterial, TransformNode } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';
import { MeshWrapper } from '../../../../engine/wrappers/MeshWrapper';

export interface MeshTemplateConfig {
    checkCollisions: boolean;
    receiveShadows: boolean;
    isPickable: boolean;
    scaling: VectorModel;
    singleton: boolean;

    materials: {
        default: StandardMaterial;
        dark: StandardMaterial;
    };
}

export class MeshTemplate {
    private meshes: MeshWrapper<any>[];
    private skeletons: Skeleton[];
    private counter = 1;
    private config: MeshTemplateConfig;
    private containerMesh: MeshWrapper<any>;

    constructor(containerMesh: MeshWrapper<any>, meshes: MeshWrapper<any>[], skeletons: Skeleton[], config: MeshTemplateConfig) {
        this.containerMesh = containerMesh;
        this.meshes = meshes;
        this.config = config;

        this.meshes.forEach(m => {
            m.wrappedMesh.isPickable = true;
            m.wrappedMesh.isVisible = false;
            m.wrappedMesh.checkCollisions = config.checkCollisions;
            m.wrappedMesh.receiveShadows = config.receiveShadows;
            m.wrappedMesh.scaling = toVector3(config.scaling);
        });

        if (!this.config.singleton) {
            this.meshes.forEach(m => m.wrappedMesh.setEnabled(false));
        }
        this.skeletons = skeletons;
    }

    public getMeshes() {
        return this.meshes;
    }

    public createMeshes(): MeshWrapper<any>[] {
        if (this.config.singleton) {
            this.meshes.forEach(mesh => mesh.wrappedMesh.isVisible = true);
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
            const clonedMesh = mesh.clone(`${mesh.getId()}-${this.counter++}`);
            clonedMesh.wrappedMesh.isVisible = true;
            return clonedMesh;
        });
    }

    private cloneMeshesAndPutUnderContainer() {
        const containerMesh = this.containerMesh.clone(`${this.containerMesh.getId()}-${this.counter++}`);
        containerMesh.wrappedMesh.isVisible = false;

        const meshes = this.cloneMeshes();

        meshes.forEach(mesh => mesh.wrappedMesh.parent = containerMesh);

        return [containerMesh, ...meshes];
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
