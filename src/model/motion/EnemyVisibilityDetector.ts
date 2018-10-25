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
        // const collisionInfo = this.thereIsNoObstacleBetweenEnemyAndPlayer(enemy.getPosition());

        // if (collisionInfo.mesh === enemy.getBody()) {
        //     enemy.setIsVisible(true);
        // } else {
        //     enemy.setIsVisible(false);
        // }

        if (this.isVisible(enemy)) {
            enemy.setIsVisible(true);
        } else {
            enemy.setIsVisible(false);
        }
    }

    private isVisible(enemy: Enemy) {
        return this.isInsideVisibleRange(enemy) && this.thereIsNoObstacleBetweenEnemyAndPlayer(enemy);
    }

    private isInsideVisibleRange(enemy: Enemy): boolean {
        var originVector3 = this.player.getPosition().clone();
        originVector3.setY(originVector3.y() + 1);

        const origin = new Vector3(originVector3.x(), originVector3.y(), originVector3.z());
        const delta = enemy.getPosition();
        const direction = new Vector3(delta.x(), delta.y(), delta.z());
        const angle = BABYLON.Vector3.GetAngleBetweenVectors(
            new Vector3(0, 0, -1),
            direction.subtract(origin),
            new Vector3(0, 1, 0)
        )
        return EnemyVisibilityDetector.isAngleBetweenFieldOfView(this.player.getRotationAngle(), Math.PI / 4, angle);
    }

    private thereIsNoObstacleBetweenEnemyAndPlayer(enemy: Enemy):  boolean {
        const delta = enemy.getPosition();
        var originVector3 = this.player.getPosition().clone();
        originVector3.setY(originVector3.y() + 1);

        const origin = new Vector3(originVector3.x(), originVector3.y(), originVector3.z());
        const direction = new Vector3(delta.x(), delta.y(), delta.z());

        if (this.prevRayHelper) {
            this.prevRayHelper.dispose();
        }

        var ray = new BABYLON.Ray(origin, direction.subtract(origin), 100);
        var hit = this.scene.pickWithRay(ray, null);

        let rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this.scene, new BABYLON.Color3(0.5, 0.5, 0.5));

        this.prevRayHelper = rayHelper;

        return hit.pickedMesh === enemy.getBody();
    }

    public static isAngleBetweenFieldOfView(fieldOfViewCenter: number, fieldOfViewExtent: number, angle: number) {
        const segments: [number, number][] = [];
        const fieldOfViewExtentHalf = fieldOfViewExtent / 2;

        if (fieldOfViewCenter + fieldOfViewExtentHalf > Math.PI) {
            segments.push([fieldOfViewCenter, Math.PI]);
            segments.push([-Math.PI, -Math.PI + (fieldOfViewCenter + fieldOfViewExtentHalf - Math.PI)]);
        } else {
            segments.push([fieldOfViewCenter, fieldOfViewCenter + fieldOfViewExtentHalf]);
        }

        if (fieldOfViewCenter - fieldOfViewExtentHalf < -Math.PI) {
            segments.push([-Math.PI, fieldOfViewCenter]);
            segments.push([Math.PI + (fieldOfViewCenter - fieldOfViewExtentHalf + Math.PI) , Math.PI]);
        } else {
            segments.push([fieldOfViewCenter - fieldOfViewExtentHalf, fieldOfViewCenter]);
        }

        console.log(segments);
        console.log(angle)

        for (let i = 0; i < segments.length; i++) {
            if (segments[i][0] < angle && segments[i][1] > angle) {
                return true;
            }
        }
        return false;
    }
}