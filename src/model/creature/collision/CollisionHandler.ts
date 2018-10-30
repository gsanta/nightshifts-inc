import { Vector3, Scene, Mesh, AbstractMesh } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { Creature } from '../type/Creature';

export interface CollisionInfo {
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

                const collisionInfo2 = this.castRay(new BABYLON.Vector3(adjustedDelta.x(), adjustedDelta.y(), adjustedDelta.z()));

                if (collisionInfo2.mesh) {
                    return new VectorModel(0, 0, 0);
                }
                return adjustedDelta;
            }
        } else {
            return delta;
        }
    }


    private  castRay(delta: BABYLON.Vector3):  CollisionInfo {
        var origin = this.creature.getPosition().clone();
        origin.setY(origin.y() + 1);

        var ray = new BABYLON.Ray(new Vector3(origin.x(), origin.y(), origin.z()), delta, 3);

        var hit = this.scene.pickWithRay(ray, (mesh: AbstractMesh) => {
            return ['ray', 'ground'].indexOf(mesh.name) === -1;
        });

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
}