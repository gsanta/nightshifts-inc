import { Mesh, Skeleton } from 'babylonjs';


export interface AnimatedModel {
    meshes: Mesh[];
    skeletons: Skeleton[];
}