import { Mesh, Skeleton } from 'babylonjs';


export class MeshModelTemplate {
    private meshes: Mesh[];
    private skeletons: Skeleton[];
    private counter = 1;

    constructor(meshes: Mesh[], skeletons: Skeleton[]) {
        this.meshes = meshes;
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
