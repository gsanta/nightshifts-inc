import { Scene, RayHelper, Ray, Color3, Vector3 } from 'babylonjs';
import { GameObject } from '../../model/game_objects/GameObject';
declare const DEBUG: boolean;

export class RayCaster {
    private scene: Scene;
    private prevRayHelper: RayHelper;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public testCollision(from: Vector3, to: Vector3, creatureToTestForCollision: GameObject) {

        if (this.prevRayHelper) {
            this.prevRayHelper.dispose();
        }

        const ray = new Ray(from, to.subtract(from), 100);
        const hit = this.scene.pickWithRay(ray, null);

        if (DEBUG) {
            const rayHelper = new RayHelper(ray);
            rayHelper.show(this.scene, new Color3(0.5, 0.5, 0.5));

            this.prevRayHelper = rayHelper;
        }

        return hit.pickedMesh === creatureToTestForCollision.meshes[0];
    }

    public getCollidingBody() {

    }
}
