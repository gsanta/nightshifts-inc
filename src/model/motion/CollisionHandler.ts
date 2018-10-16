import { Creature } from '../creature/Creature';
import { Vector3, Scene, Mesh, AbstractMesh } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';

interface CollisionInfo {
    mesh: AbstractMesh;
    normal: VectorModel;
}

export class CollisionHandler {
    private prevRayHelper: BABYLON.RayHelper = null;
    private creature: Creature;
    private scene: Scene;

    constructor(creature: Creature, scene: Scene) {
        this.creature = creature;
        this.scene = scene;
    }

    public getAdjustedDelta(delta: VectorModel): VectorModel {
        const collisionInfo = this.castRay(new BABYLON.Vector3(delta.x(), delta.y(), delta.z()));

        if (collisionInfo.mesh) {
            if (collisionInfo.mesh.name !== 'ray') {
                let invNormal = collisionInfo.normal.negate();
                invNormal = invNormal.scale(delta.multiply(collisionInfo.normal).length()); // Change normal to direction's length and normal's axis
                let adjustedDelta = delta.subtract(invNormal);

                return adjustedDelta;
            }
        } else {
            return delta;
        }
    }


    private  castRay(delta: BABYLON.Vector3):  CollisionInfo {
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

        const normal = hit.getNormal();
        return {
            mesh: hit.pickedMesh,
            normal: normal ? new VectorModel(normal.x, normal.y, normal.z) : null
        };
    }

    private vecToLocal(vector, mesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }
}