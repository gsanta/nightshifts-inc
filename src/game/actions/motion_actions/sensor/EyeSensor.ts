import { Scene } from '@babylonjs/core';
import { Sensor } from './Sensor';
import { VectorModel } from '../../../model/core/VectorModel';
import { RayCaster } from '../collision_detection/RayCaster';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';

export class EyeSensor implements Sensor {
    private player: WorldItem;
    private rayCaster: RayCaster;
    private fieldOfViewAngle = Math.PI / 4;

    constructor(player: WorldItem, scene: Scene) {
        this.player = player;
        this.rayCaster = new RayCaster(scene);
    }

    public testIsWithinRange(enemy: WorldItem): boolean {
        return this.isEnemyVisible(enemy);
    }

    public setIsVisible(isVisible: boolean) {
        throw new Error('Unimplemented method');
    }

    private isEnemyVisible(enemy: WorldItem) {
        return this.isInsideVisibleRange(enemy) && this.thereIsNoObstacleBetweenEnemyAndPlayer(enemy);
    }

    private isInsideVisibleRange(enemy: WorldItem): boolean {
        const playerVector = this.player.getCenterPosition();
        const enemyVector = enemy.getCenterPosition();
        const playerToEnemyVector = enemyVector.subtract(playerVector);
        const negativeZUnitVector = new VectorModel(0, 0, -1);

        const angle = negativeZUnitVector.getAngleToVectorOnXZPlane(playerToEnemyVector);

        return EyeSensor.isAngleBetweenFieldOfView(this.player.getRotation().y, this.fieldOfViewAngle, angle);
    }

    private thereIsNoObstacleBetweenEnemyAndPlayer(enemy: WorldItem):  boolean {
        return this.rayCaster.testCollision(this.player.getCenterPosition(), enemy.getCenterPosition(), enemy);
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
