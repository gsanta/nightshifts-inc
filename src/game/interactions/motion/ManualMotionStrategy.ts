import { MotionStrategy } from './MotionStrategy';
import { VectorModel } from '../../model/core/VectorModel';
import { UserInputEventEmitter, MoveDirection, RotationDirection } from './UserInputEventEmitter';
import { CollisionDetector } from '../../actions/motion_actions/collision_detection/CollisionDetector';
import { Player } from '../../world/world_items/player/Player';

export class ManualMotionStrategy implements MotionStrategy {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Player;
    private collisionDetector: CollisionDetector;
    private rotationDirection: RotationDirection = null;
    private direction: MoveDirection = null;

    private interval = 1000;
    private distanceByInterval = 10;

    constructor(player: Player, collisionDetector: CollisionDetector, keyBoardHandler: UserInputEventEmitter) {
        this.player = player;
        this.collisionDetector = collisionDetector;
        this.subscribeToUserInputs(keyBoardHandler);
    }

    public calcNextPositionDelta(elapsedTime: number) {
        const distance = elapsedTime / this.interval * this.distanceByInterval;

        let delta = new VectorModel(0, 0, 0);
        if (this.direction === 'FORWARD') {
            delta = new VectorModel(0, 0, -1).scale(distance);
        } else if (this.direction === 'BACKWARD') {
            delta = new VectorModel(0, 0, 1).scale(distance);
        }

        delta = this.calcNextPositionDeltaConsideringRotation(delta);
        return this.collisionDetector.getAdjustedDelta(delta);
    }

    public calcNextRotationDelta(elapsedTime: number): number {
        let distance = elapsedTime / this.interval;
        if (this.rotationDirection === 'RIGHT') {
            return Math.PI * 2 * distance;
        } else if (this.rotationDirection === 'LEFT') {
            return -1 * Math.PI * 2 * distance;
        }

        return 0;
    }

    public isIdle() {
        return !(this.direction || this.rotationDirection);
    }

    private setDirection(direction: MoveDirection) {
        if (this.direction !== direction) {
            this.direction = direction;
            this.setAnimation();
        }
    }

    private setRotationDirection(direction: RotationDirection) {
        if (this.rotationDirection !== direction) {
            this.rotationDirection = direction;
            this.setAnimation();
        }
    }

    private setAnimation() {
        if (this.direction || this.rotationDirection) {
            this.player.playWalkingAnimation();
        } else {
            this.player.playIdleAnimation();
        }
    }

    private calcNextPositionDeltaConsideringRotation(delta: VectorModel) {
        let rotation = this.player.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z;
        const horizontalDirection = Math.cos(rotation) * delta.z;

        return new VectorModel(verticalDirection, 0, horizontalDirection);
    }

    private subscribeToUserInputs(keyBoardHandler: UserInputEventEmitter) {
        keyBoardHandler.onMove((direction) => this.setDirection(direction));
        keyBoardHandler.onMoveEnd(() => this.setDirection(null));
        keyBoardHandler.onTurn((direction) => this.setRotationDirection(direction));
        keyBoardHandler.onTurnEnd(() => this.setRotationDirection(null));
    }
}
