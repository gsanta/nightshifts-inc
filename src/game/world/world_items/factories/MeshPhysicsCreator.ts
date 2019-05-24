import { Mesh, PhysicsImpostor, Scene } from '@babylonjs/core';

export class MeshPhysicsCreator {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public create(mesh: Mesh) {
        const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.BoxImpostor, { mass: 2, friction: 1, restitution: 0.3 }, this.scene);
        mesh.physicsImpostor = impostor;
    }
}
