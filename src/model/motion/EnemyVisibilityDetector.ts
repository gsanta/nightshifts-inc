import { Player } from '../creature/Player';
import { Enemy } from '../creature/Enemy';
import { Scene } from 'babylonjs';
import { VectorModel } from '../core/VectorModel';
import { RayCaster } from '../collision/RayCaster';

export class EnemyVisibilityDetector {
    private player: Player;
    private rayCaster: RayCaster;

    constructor(player: Player, scene: Scene) {
        this.player = player;
        this.rayCaster = new RayCaster(scene);
    }

    public testVisibility(enemy: Enemy) {
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
        const playerPosition = this.player.getPosition();
        const enemyPosition = enemy.getPosition();
        const enemyPositionFromPlayerPosition = enemyPosition.subtract(playerPosition);
        const negativeZUnitVector = new VectorModel(0, 0, -1);

        const angle = negativeZUnitVector.getAngleToVectorOnXZPlane(enemyPositionFromPlayerPosition);

        return EnemyVisibilityDetector.isAngleBetweenFieldOfView(this.player.getRotationAngle(), this.player.getFieldOfViewAngle(), angle);
    }

    private thereIsNoObstacleBetweenEnemyAndPlayer(enemy: Enemy):  boolean {
        return this.rayCaster.testCollision(this.player, enemy);
    }

    public static isAngleBetweenFieldOfView(fieldOfViewCenter: number, fieldOfViewAngle: number, angle: number) {
        const segments: [number, number][] = [];
        const fieldOfViewExtentHalf = fieldOfViewAngle / 2;

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

        for (let i = 0; i < segments.length; i++) {
            if (segments[i][0] < angle && segments[i][1] > angle) {
                return true;
            }
        }
        return false;
    }
}