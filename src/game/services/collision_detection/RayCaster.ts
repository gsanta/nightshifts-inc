import { Scene, RayHelper, Ray, Color3 } from '@babylonjs/core';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { GameObject } from '../../model/game_objects/GameObject';
declare const DEBUG: boolean;

export class RayCaster {
    private scene: Scene;
    private prevRayHelper: RayHelper;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public testCollision(from: VectorModel, to: VectorModel, creatureToTestForCollision: GameObject) {
        const fromPosition = toVector3(from);
        const toPosition = toVector3(to);

        if (this.prevRayHelper) {
            this.prevRayHelper.dispose();
        }

        const ray = new Ray(fromPosition, toPosition.subtract(fromPosition), 100);
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
