import { Scene } from '@babylonjs/core';
import { Sensor } from './Sensor';
import { VectorModel } from '../../model/core/VectorModel';
import { RayCaster } from '../collision_detection/RayCaster';
import { GameObject } from '../../world/world_items/item_types/GameObject';

export class EyeSensor implements Sensor {
    private player: GameObject;
    private rayCaster: RayCaster;
    private fieldOfViewAngle = Math.PI / 4;

    constructor(player: GameObject, scene: Scene) {
        this.player = player;
        this.rayCaster = new RayCaster(scene);
    }

    public testIsWithinRange(enemy: GameObject): boolean {
        return this.isEnemyVisible(enemy);
    }

    public setIsVisible(isVisible: boolean) {
        throw new Error('Unimplemented method');
    }

    private isEnemyVisible(enemy: GameObject) {
        return this.isInsideVisibleRange(enemy) && this.thereIsNoObstacleBetweenEnemyAndPlayer(enemy);
    }

    private isInsideVisibleRange(enemy: GameObject): boolean {
        const playerCenter = this.player.boundingBox.getBoundingCenter();
        const enemyCenter = enemy.boundingBox.getBoundingCenter();
        const playerVector = new VectorModel(playerCenter.x, 0, playerCenter.y);
        const enemyVector = new VectorModel(enemyCenter.x, 0, enemyCenter.y);
        const playerToEnemyVector = enemyVector.subtract(playerVector);
        const negativeZUnitVector = new VectorModel(0, 0, -1);

        const angle = negativeZUnitVector.getAngleToVectorOnXZPlane(playerToEnemyVector);

        return EyeSensor.isAngleBetweenFieldOfView(this.player.getRotation().y, this.fieldOfViewAngle, angle);
    }

    private thereIsNoObstacleBetweenEnemyAndPlayer(enemy: GameObject):  boolean {
        const playerCenter = this.player.boundingBox.getBoundingCenter();
        const enemyCenter = enemy.boundingBox.getBoundingCenter();
        const playerVector = new VectorModel(playerCenter.x, 0, playerCenter.y);
        const enemyVector = new VectorModel(enemyCenter.x, 0, enemyCenter.y);
        return this.rayCaster.testCollision(playerVector, enemyVector, enemy);
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
