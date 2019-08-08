import { Mesh } from 'babylonjs';

// TODO: add missing methods
export class Sphere {
    public height: number;
}

export function calculateBoundingShpere(mesh: Mesh): Sphere {
    return {
        height: mesh.getBoundingInfo().boundingBox.maximumWorld.y - mesh.getBoundingInfo().boundingBox.minimumWorld.y
    };
}