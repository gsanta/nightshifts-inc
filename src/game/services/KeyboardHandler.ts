import { MotionStrategy } from './motion/MotionStrategy';
import { ServiceFacade } from './ServiceFacade';
import { ManualMotionStrategy } from './motion/ManualMotionStrategy';
import { World } from '../model/game_objects/World';
import { Axis, Space } from '@babylonjs/core';

export enum Keys {
    FORWARD = 38,
    BACKWARD = 40,
    LEFT = 37,
    RIGHT = 39,
    W = 87,
    D = 68,
    A = 65,
    S = 83,
    E = 69,
    SPACE = 32
}

export type MoveDirection = 'FORWARD' | 'BACKWARD';
export type RotationDirection = 'LEFT' | 'RIGHT';

export class KeyboardHandler {
    private services: ServiceFacade;
    private motionStrategy: ManualMotionStrategy;
    private moveAnimationFrameTimestamp: number = null;
    private rotationAnimationFrameTimestamp: number = null;
    private prevMoveTime: number = null;
    private prevRotationTime: number = null;
    private activeMoveDirection: Keys.FORWARD | Keys.BACKWARD = null;
    private activeRotationDirection: Keys.LEFT | Keys.RIGHT = null;
    private world: World;

    constructor(services: ServiceFacade, motionStrategy: ManualMotionStrategy, world: World) {
        this.services = services;
        this.motionStrategy = motionStrategy;
        this.world = world;
    }

    public onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case Keys.FORWARD:
                if (this.activeMoveDirection !== Keys.FORWARD) {
                    this.world.scene.stopAnimation(this.world.player.skeleton);
                    this.world.scene.beginAnimation(this.world.player.skeleton, 0, 100, true, 1.0);
                    this.activeMoveDirection = Keys.FORWARD;
                    this.forward();
                }
                break;
            case Keys.BACKWARD:
                if (this.activeMoveDirection !== Keys.BACKWARD) {
                    this.world.scene.stopAnimation(this.world.player.skeleton);
                    this.world.scene.beginAnimation(this.world.player.skeleton, 0, 100, true, 1.0);
                    this.activeMoveDirection = Keys.BACKWARD;
                    this.backward();
                }
                break;
            case Keys.LEFT:
                if (this.activeRotationDirection !== Keys.LEFT) {
                    this.turnLeft();
                    this.activeRotationDirection = Keys.LEFT;
                }
                break;
            case Keys.RIGHT:
                if (this.activeRotationDirection !== Keys.RIGHT) {
                    this.turnRight();
                    this.activeRotationDirection = Keys.RIGHT;
                }
                break;
            case Keys.SPACE:
                this.doAction();
                break;
            default:
                break;
        }
    }

    public onKeyUp(event: KeyboardEvent) {
        switch (event.keyCode) {
            case Keys.FORWARD:
            case Keys.BACKWARD:
                this.activeMoveDirection = null;
                this.world.scene.stopAnimation(this.world.player.skeleton);
                if (this.moveAnimationFrameTimestamp !== null) {
                    cancelAnimationFrame(this.moveAnimationFrameTimestamp);
                    this.moveAnimationFrameTimestamp = null;
                }

                this.prevMoveTime = null;
                break;

            case Keys.LEFT:
            case Keys.RIGHT:
                this.prevRotationTime = null;
                this.activeRotationDirection = null;
                if (this.rotationAnimationFrameTimestamp !== null) {
                    cancelAnimationFrame(this.rotationAnimationFrameTimestamp);
                    this.rotationAnimationFrameTimestamp = null;
                }
                break;
            default:
                break;
        }
    }

    private forward() {
        this.moveAnimationFrameTimestamp = requestAnimationFrame(() => {

            if (this.moveAnimationFrameTimestamp !== null) {
                this.forward.bind(this)();
            }
            this.move('FORWARD');
        });
    }

    private turnLeft() {
        this.rotationAnimationFrameTimestamp = requestAnimationFrame(() => {
            this.rotate('LEFT');

            if (this.rotationAnimationFrameTimestamp !== null) {
                this.turnLeft.bind(this)();
            }
        });
    }

    private turnRight() {
        this.rotationAnimationFrameTimestamp = requestAnimationFrame(() => {
            this.rotate('RIGHT');

            if (this.rotationAnimationFrameTimestamp !== null) {
                this.turnRight.bind(this)();
            }
        });
    }

    private doAction() {
        this.services.playerService.doAction();
    }

    private backward() {
        this.moveAnimationFrameTimestamp = requestAnimationFrame(() => {

            if (this.moveAnimationFrameTimestamp !== null) {
                this.backward.bind(this)();
            }
            this.move('BACKWARD');
        });
    }

    private move(direction: MoveDirection) {
        const currentTime = Date.now();

        if (this.prevMoveTime) {
            const elapsedTime = currentTime - this.prevMoveTime;

            const delta = this.motionStrategy.calcNextPositionDelta(elapsedTime, direction);
            this.services.playerService.move(delta);
        }
        this.prevMoveTime = currentTime;
    }

    private rotate(direction: RotationDirection) {
        const currentTime = Date.now();

        if (this.prevRotationTime) {
            const elapsedTime = currentTime - this.prevRotationTime;

            const delta = this.motionStrategy.calcNextRotationDelta(elapsedTime, direction);
            this.world.player.meshes[0].rotate(Axis.Y, delta, Space.WORLD);
        }
        this.prevRotationTime = currentTime;
    }
}
