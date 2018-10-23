import { Creature } from '../creature/Creature';
import { Vector3, Scene, Mesh, AbstractMesh } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';
import * as BABYLON from 'babylonjs';

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

    private vecToLocal(vector, creature: Creature){
        var m = BABYLON.Matrix.FromArray(creature.getWorldMatrixArray());
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }
}