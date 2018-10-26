import { Creature } from '../creature/Creature';
import { toVector3 } from '../core/VectorModel';
import { Scene } from 'babylonjs';
import * as BABYLON from 'babylonjs';
declare const DEBUG: boolean;

export class RayCaster {
    private scene: Scene;
    private prevRayHelper: BABYLON.RayHelper;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    testCollision(from: Creature, to: Creature) {
        const fromPosition = toVector3(from.getPosition())
        const toPosition = toVector3(to.getPosition());

        if (this.prevRayHelper) {
            this.prevRayHelper.dispose();
        }

        const ray = new BABYLON.Ray(fromPosition, toPosition.subtract(fromPosition), 100);
        const hit = this.scene.pickWithRay(ray, null);

        if (DEBUG) {
            const rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(this.scene, new BABYLON.Color3(0.5, 0.5, 0.5));

            this.prevRayHelper = rayHelper;
        }

        return hit.pickedMesh === to.getBody();
    }
}