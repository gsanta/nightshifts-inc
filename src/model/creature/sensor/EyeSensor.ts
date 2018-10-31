import { Scene } from 'babylonjs';
import { Sensor } from './Sensor';
import { Player } from '../type/Player';
import { Enemy } from '../type/Enemy';
import { VectorModel } from '../../core/VectorModel';
import { RayCaster } from '../collision/RayCaster';

export class EyeSensor implements Sensor {
    private player: Player;
    private rayCaster: RayCaster;

    constructor(player: Player, scene: Scene) {
        this.player = player;
        this.rayCaster = new RayCaster(scene);
    }

    public testIsWithinRange(enemy: Enemy): boolean {
        return this.isVisible(enemy);
    }

    private isVisible(enemy: Enemy) {
        return this.isInsideVisibleRange(enemy) && this.thereIsNoObstacleBetweenEnemyAndPlayer(enemy);
    }

    private isInsideVisibleRange(enemy: Enemy): boolean {
        const playerVector = this.player.getPosition();
        const enemyVector = enemy.getPosition();
        const playerToEnemyVector = enemyVector.subtract(playerVector);
        const negativeZUnitVector = new VectorModel(0, 0, -1);

        const angle = negativeZUnitVector.getAngleToVectorOnXZPlane(playerToEnemyVector);

        return EyeSensor.isAngleBetweenFieldOfView(this.player.getRotationAngle(), this.player.getFieldOfViewAngle(), angle);
    }

    private thereIsNoObstacleBetweenEnemyAndPlayer(enemy: Enemy):  boolean {
        return this.rayCaster.testCollision(this.player.getPosition(), enemy.getPosition(), enemy);
    }

    public static isAngleBetweenFieldOfView(fieldOfViewCenter: number, fieldOfViewAngle: number, angleToTest: number) {
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
            if (segments[i][0] < angleToTest && segments[i][1] > angleToTest) {
                return true;
            }
        }
        return false;
    }
}