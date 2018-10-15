import { Creature } from '../creature/Creature';
import { Vector3, Scene } from 'babylonjs';


export class CollisionHandler {
    private prevRayHelper: BABYLON.RayHelper = null;
    private creature: Creature;
    private scene: Scene;

    constructor(creature: Creature, scene: Scene) {
        this.creature = creature;
        this.scene = scene;
    }

    public getAdjustedDelta(delta: Vector3): Vector3 {
        const pickingInfo = this.castRay(delta);

        if (pickingInfo.pickedMesh) {
            if (pickingInfo.pickedMesh.name !== 'ray') {
                let invNormal = pickingInfo.getNormal().negate();
                invNormal = invNormal.scale(delta.multiply(pickingInfo.getNormal()).length()); // Change normal to direction's length and normal's axis
                let wallDir = delta.subtract(invNormal);

                const newPos = this.creature.getBody().position.add(wallDir);

                return newPos;
            }
        } else {
            return this.creature.getBody().getAbsolutePosition().clone().add(delta);
        }
    }


    private  castRay(delta: BABYLON.Vector3):  BABYLON.PickingInfo {
        var origin = this.creature.getBody().getAbsolutePosition().clone();
        origin.y += 1;

        var forward = new BABYLON.Vector3(0,1,1);
        forward = this.vecToLocal(forward, this.creature.getBody());

        var ray = new BABYLON.Ray(origin, delta, 3);

        var hit = this.scene.pickWithRay(ray, null);

        // let rayHelper = new BABYLON.RayHelper(ray);
        // rayHelper.show(scene, new BABYLON.Color3(0.5, 0.5, 0.5));

        // if (prevRayHelper) {
        //     prevRayHelper.dispose();
        // }

        // prevRayHelper = rayHelper;

        return hit;
    }

    private vecToLocal(vector, mesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }
}