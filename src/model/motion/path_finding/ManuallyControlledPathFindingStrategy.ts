import { Vector3 } from 'babylonjs';
import { Creature } from '../../creature/Creature';
import { PathFindingStrategy } from './PathFindingStrategy';
import { VectorModel } from '../../core/VectorModel';

export class ManuallyControlledPathFindingStrategy implements PathFindingStrategy {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Creature;
    private rotationDirection: 'left' | 'right' = null;
    private direction: 'forward' | 'backward' = null;

    private interval = 1000;
    private distanceByInterval = 10;

    constructor(player: Creature) {
        this.player = player;
    }

    public getPosition() {
        return this.player.getPosition();
    }

    public getNextPosition(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;

        if (this.direction === 'forward') {
            return new VectorModel(0, 0, -1).scale(distance);
        } else if (this.direction === 'backward') {
            return new VectorModel(0, 0, 1).scale(distance);
        }

        return new VectorModel(0, 0, 0);
    }

    public translate(v: Vector3) {
        this.player.translate(v, 1);
    }

    public rotate(elapsedTime: number) {
        let distance = elapsedTime / this.interval;
        if (this.rotationDirection === 'right') {
            this.player.rotate(Math.PI * 2 * distance);
        } else if (this.rotationDirection === 'left') {
            this.player.rotate(-1 * Math.PI * 2 * distance);
        }
    }

    public isIdle() {
        return !(this.direction || this.rotationDirection);
    }

    public setDirection(direction: 'forward' | 'backward') {
        if (this.direction !== direction) {
            this.direction = direction;
            this.setAnimation();
        }
    }

    public setRotationDirection(direction: 'left' | 'right') {
        if (this.rotationDirection !== direction) {
            this.rotationDirection = direction;
            this.setAnimation();
        }
    }

    private setAnimation() {
        if (this.direction || this.rotationDirection) {
            this.player.walk();
        } else {
            this.player.idle();
        }
    }
}