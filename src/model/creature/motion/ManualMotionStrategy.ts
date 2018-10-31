import { Vector3 } from 'babylonjs';
import { Creature } from '../type/Creature';
import { MotionStrategy } from './MotionStrategy';
import { VectorModel } from '../../core/VectorModel';
import { KeyboardHandler, MoveDirection, RotationDirection } from '../../KeyboardHandler';

export class ManualMotionStrategy implements MotionStrategy {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Creature;
    private rotationDirection: RotationDirection = null;
    private direction: MoveDirection = null;

    private interval = 1000;
    private distanceByInterval = 10;

    constructor(player: Creature, keyBoardHandler: KeyboardHandler) {
        this.player = player;

        this.subscribeToUserInputs(keyBoardHandler);
    }

    public getNextPosition(elapsedTime: number) {
        const distance = elapsedTime / this.interval * this.distanceByInterval;

        let delta = new VectorModel(0, 0, 0)
        if (this.direction === 'FORWARD') {
            delta = new VectorModel(0, 0, -1).scale(distance);
        } else if (this.direction === 'BACKWARD') {
            delta = new VectorModel(0, 0, 1).scale(distance);
        }

        return this.calcNextPositionConsideringRotation(delta);
    }

    public rotate(elapsedTime: number) {
        let distance = elapsedTime / this.interval;
        if (this.rotationDirection === 'RIGHT') {
            this.player.rotate(Math.PI * 2 * distance);
        } else if (this.rotationDirection === 'LEFT') {
            this.player.rotate(-1 * Math.PI * 2 * distance);
        }
    }

    public isIdle() {
        return !(this.direction || this.rotationDirection);
    }

    public setDirection(direction: MoveDirection) {
        if (this.direction !== direction) {
            this.direction = direction;
            this.setAnimation();
        }
    }

    public setRotationDirection(direction: RotationDirection) {
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

    private calcNextPositionConsideringRotation(delta: VectorModel) {
        let rotation = this.player.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z();
        const horizontalDirection = Math.cos(rotation) * delta.z();

        return new VectorModel(verticalDirection, 0, horizontalDirection);
    }

    private subscribeToUserInputs(keyBoardHandler: KeyboardHandler) {
        keyBoardHandler.onMove((direction) => this.setDirection(direction));
        keyBoardHandler.onMoveEnd(() => this.setDirection(null));
        keyBoardHandler.onTurn((direction) => this.setRotationDirection(direction));
        keyBoardHandler.onTurnEnd(() => this.setRotationDirection(null));
    }
}