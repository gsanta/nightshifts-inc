import { MotionStrategy } from './MotionStrategy';
import { VectorModel } from '../../core/VectorModel';
import { Creature } from '../type/Creature';

export class AttackingMotionStrategy implements MotionStrategy {
    private attacker: Creature;
    private target: Creature;
    private speed = 100;

    constructor(attacker: Creature, target: Creature) {
        this.attacker = attacker;
        this.target = target;
    }

    public calcNextPositionDelta(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;
        const destination = this.target.getPosition();
        const currentPosition = this.attacker.getPosition();

        const direction = destination.subtract(currentPosition).normalize();

        return direction.scale(distance);
    }

    public isIdle(): boolean {
        throw new Error('Method not implemented.');
    }

    public calcNextRotationDelta(elapsedTime: number): number {
        throw new Error('Method not implemented.');
    }
}
