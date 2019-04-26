import { Scene } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { Creature } from '../../world/world_items/Creature';
declare const DEBUG: boolean;

export class RayCaster {
    private scene: Scene;
    private prevRayHelper: BABYLON.RayHelper;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public testCollision(from: VectorModel, to: VectorModel, creatureToTestForCollision: Creature) {
        const fromPosition = toVector3(from)
        const toPosition = toVector3(to);

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

        return hit.pickedMesh === creatureToTestForCollision.getBody();
    }

    public getCollidingBody() {

    }
}