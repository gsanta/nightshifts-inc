import { Vector3, Scene, Mesh, AbstractMesh } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import { VectorModel } from '../../model/core/VectorModel';
import { Creature } from '../../model/world_items/Creature';

export interface CollisionInfo {
    mesh: AbstractMesh | null;
    normal: VectorModel | null;
}

export class CollisionDetector {
    private creature: Creature;
    private scene: Scene;

    constructor(creature: Creature, scene: Scene) {
        this.creature = creature;
        this.scene = scene;
    }

    public getAdjustedDelta(delta: VectorModel): VectorModel {
        const collisionInfo = this.castRay(new BABYLON.Vector3(delta.x, delta.y, delta.z));

        if (collisionInfo.mesh) {
            if (collisionInfo.mesh.name !== 'ray') {
                let invNormal = collisionInfo.normal!.negate();
                invNormal = invNormal.scale(delta.multiply(collisionInfo.normal!).length()); // Change normal to direction's length and normal's axis
                let adjustedDelta = delta.subtract(invNormal);

                const collisionInfo2 = this.castRay(new BABYLON.Vector3(adjustedDelta.x, adjustedDelta.y, adjustedDelta.z));

                if (collisionInfo2.mesh) {
                    return new VectorModel(0, 0, 0);
                }
                return adjustedDelta;
            }
        }

        return delta;
    }


    private  castRay(delta: BABYLON.Vector3):  CollisionInfo {
        const origin = this.creature.getCenterPosition().clone();
        origin.addY(origin.y + 1);

        const ray = new BABYLON.Ray(new Vector3(origin.x, 0.1, origin.z), delta, 3);

        const hit = this.scene.pickWithRay(ray, (mesh: AbstractMesh) => {
            return ['ray', 'ground', 'thermometer'].indexOf(mesh.name) === -1;
        });

        let normal: Vector3 | null = null;
        let mesh: AbstractMesh | null = null;
        if (hit && hit.pickedMesh) {
            normal = hit.getNormal();
            mesh = hit.pickedMesh;
        }

        return {
            mesh: mesh,
            normal: normal ? new VectorModel(normal.x, normal.y, normal.z) : null
        };
    }
}
