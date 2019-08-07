import { VectorModel } from '../../model/core/VectorModel';
import { CollisionDetector } from '../collision_detection/CollisionDetector';
import { Scene } from '@babylonjs/core';
import { GameObject } from '../../model/game_objects/GameObject';
import { RotationDirection, MoveDirection } from '../KeyboardHandler';

export class ManualMotionStrategy {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: GameObject;
    private collisionDetector: CollisionDetector;
    private rotationDirection: RotationDirection = null;
    private direction: MoveDirection = null;
    private scene: Scene;

    private interval = 1000;
    private distanceByInterval = 10;

    constructor(player: GameObject, scene: Scene, collisionDetector: CollisionDetector = new CollisionDetector(player, scene)) {
        this.player = player;
        this.scene = scene;
        this.collisionDetector = collisionDetector;
    }

    public calcNextPositionDelta(elapsedTime: number, direction: MoveDirection) {
        this.setAnimation();
        this.direction = direction;
        const distance = elapsedTime / this.interval * this.distanceByInterval;

        let delta = new VectorModel(0, 0, 0);
        if (direction === 'FORWARD') {
            delta = new VectorModel(0, 0, -1).scale(distance);
        } else if (direction === 'BACKWARD') {
            delta = new VectorModel(0, 0, 1).scale(distance);
        }

        delta = this.calcNextPositionDeltaConsideringRotation(delta);
        return this.collisionDetector.getAdjustedDelta(delta);
    }

    public calcNextRotationDelta(elapsedTime: number, rotationDirection: RotationDirection): number {
        let distance = elapsedTime / this.interval;
        if (rotationDirection === 'RIGHT') {
            return Math.PI * 2 * distance;
        } else if (rotationDirection === 'LEFT') {
            return -1 * Math.PI * 2 * distance;
        }

        return 0;
    }

    public isIdle() {
        return !(this.direction || this.rotationDirection);
    }

    // private setDirection(direction: MoveDirection) {
    //     if (this.direction !== direction) {
    //         this.direction = direction;
    //         this.setAnimation();
    //     }
    // }

    // private setRotationDirection(direction: RotationDirection) {
    //     if (this.rotationDirection !== direction) {
    //         this.rotationDirection = direction;
    //         this.setAnimation();
    //     }
    // }

    private setAnimation() {
        // this.scene.stopAnimation(this.player.skeleton);
        // if (this.direction || this.rotationDirection) {
        //     this.scene.stopAnimation(this.player.skeleton);
        //     this.scene.beginAnimation(this.player.skeleton, 0, 100, true, 1.0);
        // } else {
        // }
    }

    private calcNextPositionDeltaConsideringRotation(delta: VectorModel) {
        let rotation = this.player.meshes[0].rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z;
        const horizontalDirection = Math.cos(rotation) * delta.z;

        return new VectorModel(verticalDirection, 0, horizontalDirection);
    }
}
