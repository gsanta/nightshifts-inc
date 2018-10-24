import { Player } from '../creature/Player';
import { Enemy } from '../creature/Enemy';
import { CollisionInfo } from './CollisionHandler';
import { Vector3, Scene, RayHelper } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';
import * as BABYLON from 'babylonjs';

export class EnemyVisibilityDetector {
    private player: Player;
    private scene: Scene;
    private prevRayHelper: RayHelper;

    constructor(player: Player, scene: Scene) {
        this.player = player;
        this.scene = scene;
    }

    public testVisibility(enemy: Enemy) {
        const collisionInfo = this.castRay(enemy.getPosition());

        if (collisionInfo.mesh === enemy.getBody()) {
            enemy.setIsVisible(true);
        } else {
            enemy.setIsVisible(false);
        }
    }

    private  castRay(delta: VectorModel):  CollisionInfo {
        var originVector3 = this.player.getPosition().clone();
        originVector3.setY(originVector3.y() + 1);

        const origin = new Vector3(originVector3.x(), originVector3.y(), originVector3.z());
        const direction = new Vector3(delta.x(), delta.y(), delta.z());

        if (this.prevRayHelper) {
            this.prevRayHelper.dispose();
        }

        const angle = BABYLON.Vector3.GetAngleBetweenVectors(
            new Vector3(0, 0, -1),
            direction.subtract(origin),
            new Vector3(0, 1, 0)
        )

        const angle2 = BABYLON.Vector3.GetAngleBetweenVectors(
            new Vector3(1, 0, 0),
            this.player.getRotation(),
            new Vector3(0, 1, 0)
        )
        console.log(this.player.getRotationAngle());
        // console.log(angle);

        var ray = new BABYLON.Ray(origin, direction.subtract(origin), 100);
        var hit = this.scene.pickWithRay(ray, null);

        let rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this.scene, new BABYLON.Color3(0.5, 0.5, 0.5));

        this.prevRayHelper = rayHelper;
        const normal = hit.getNormal();

        return {
            mesh: hit.pickedMesh,
            normal: normal ? new VectorModel(normal.x, normal.y, normal.z) : null
        };
    }
}