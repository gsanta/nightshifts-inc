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
    private containerMesh: Mesh;

    constructor(containerMesh: Mesh, meshes: Mesh[], skeletons: Skeleton[], config: MeshTemplateConfig) {
        this.containerMesh = containerMesh;
        this.meshes = meshes;
        this.config = config;

        // this.meshes[0].checkCollisions = config.checkCollisions;
        // this.meshes[0].receiveShadows = config.receiveShadows;
        // this.meshes[0].scaling = toVector3(config.scaling);
        this.meshes.forEach(m => {
            m.isPickable = true;
            m.isVisible = false;
            m.checkCollisions = config.checkCollisions;
            m.receiveShadows = config.receiveShadows;
            m.scaling = toVector3(config.scaling);
        });

        if (!this.config.singleton) {
            // this.meshes[0].setEnabled(false);

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

        let meshes: Mesh[] = [];

        // this.meshes.forEach(mesh => {
        //     const clonedMesh = mesh.clone(`${mesh.name}-${this.counter++}`);
        //     clonedMesh.isVisible = true;
        //     meshes.push(mesh);
        // });

        // let meshes = [...this.meshes];

        // if (this.containerMesh) {
        //     meshes.unshift(this.containerMesh);
        // }



        if (this.containerMesh) {
            const mesh = this.containerMesh.clone(`${this.containerMesh.name}-${this.counter++}`);
            mesh.isVisible = false;
            meshes = [mesh, ...(<Mesh[]> mesh.getChildMeshes())];
        } else {
            meshes = this.meshes.map(mesh => {
                const clonedMesh = mesh.clone(`${mesh.name}-${this.counter++}`);
                clonedMesh.isVisible = true;
                return clonedMesh;
            });
        }

        // if (meshes.length > 1) {
        //     const [first, ...rest] = meshes;
        //     rest.forEach(mesh => mesh.parent = first);
        //     first.isVisible = false;
        // }

        return meshes;
    }

    public getSkeletons(): Skeleton[] {
        return this.skeletons;
    }
}
