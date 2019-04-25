import { MotionStrategy } from './MotionStrategy';
import { VectorModel } from '../../model/core/VectorModel';
import { Creature } from '../../world_items/Creature';
import { CollisionDetector } from '../collision/CollisionDetector';

export class AttackingMotionStrategy implements MotionStrategy {
    private attacker: Creature;
    private target: Creature;
    private collisionDetector: CollisionDetector;
    private speed = 100;

    constructor(attacker: Creature, target: Creature, collisionDetector: CollisionDetector) {
        this.attacker = attacker;
        this.target = target;
        this.collisionDetector = collisionDetector;
    }

    public calcNextPositionDelta(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;
        const destination = this.target.getCenterPosition();
        const currentPosition = this.attacker.getCenterPosition();

        const direction = destination.subtract(currentPosition).normalize();

        const delta = direction.scale(distance);

        return this.collisionDetector.getAdjustedDelta(delta);
    }

    public isIdle(): boolean {
        throw new Error('Method not implemented.');
    }

    public calcNextRotationDelta(elapsedTime: number): number {
        throw new Error('Method not implemented.');
    }
}
