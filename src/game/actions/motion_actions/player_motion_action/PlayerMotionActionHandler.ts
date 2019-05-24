import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { CollisionDetector } from '../collision_detection/CollisionDetector';
import { GameActionType } from '../../GameActionType';
import { MotionStrategy } from '../MotionStrategy';
import { ManualMotionStrategy } from '../ManualMotionStrategy';
import { ActionDispatcher } from '../../ActionDispatcher';
import { UserInputEventEmitter } from '../UserInputEventEmitter';
import { VectorModel } from '../../../model/core/VectorModel';

export class PlayerMotionActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;
    private motionStrategy: MotionStrategy;
    private keyboardHandler: UserInputEventEmitter;
    private previousTime: number = null;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
        this.keyboardHandler = new UserInputEventEmitter();
        this.keyboardHandler.subscribe();
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                this.initWhenGameIsReady(world);
                this.previousTime = Date.now();
                break;
            case GameActionType.NEXT_TICK:
                const currentTime = Date.now();

                if (this.motionStrategy) {
                    const elapsedTime = currentTime - this.previousTime;

                    if (!this.motionStrategy.isIdle()) {
                        const delta = this.motionStrategy.calcNextPositionDelta(elapsedTime);

                        const absolutePos = world.player.mesh.getAbsolutePosition();
                        const pos = new VectorModel(absolutePos.x, absolutePos.y, absolutePos.z);
                        world.player.setPosition(pos.add(delta));

                        this.actionDispatcher.dispatch(GameActionType.PLAYER_MOVED);
                    }

                    const rotationDelta = this.motionStrategy.calcNextRotationDelta(elapsedTime);
                    world.player.rotateY(rotationDelta);
                }

                this.previousTime = currentTime;
                break;
            default:
                break;
        }
    }

    private initWhenGameIsReady(world: World) {
        const collisionDetector = new CollisionDetector(world.player, world.scene);
        this.motionStrategy = new ManualMotionStrategy(world.player, collisionDetector, this.keyboardHandler, world.scene);
        this.keyboardHandler.onDoAction(() => this.actionDispatcher.dispatch(GameActionType.ACTIVATE_CLOSEST_ACTIONABLE_WORLD_ITEM));
    }
}
