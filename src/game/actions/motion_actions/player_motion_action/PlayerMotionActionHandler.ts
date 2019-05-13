import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { CollisionDetector } from '../collision_detection/CollisionDetector';
import { GameActionType } from '../../GameActionType';
import { MotionStrategy } from '../MotionStrategy';
import { ManualMotionStrategy } from '../ManualMotionStrategy';
import { ActionDispatcher } from '../../ActionDispatcher';
import { UserInputEventEmitter } from '../UserInputEventEmitter';
import { ActionStrategy } from '../ActionStrategy';


export class PlayerMotionActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;
    private motionStrategy: MotionStrategy;
    private keyboardHandler: UserInputEventEmitter;
    private actionStrategy: ActionStrategy;
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
                        world.player.setPosition(world.player.getCenterPosition().add(delta));

                        this.actionDispatcher.dispatch(GameActionType.PLAYER_MOVED);
                    }

                    const rotationDelta = this.motionStrategy.calcNextRotationDelta(elapsedTime);
                    world.player.setRotation(rotationDelta);
                }

                this.previousTime = currentTime;
                break;
            default:
                break;
        }
    }

    private initWhenGameIsReady(world: World) {
        const collisionDetector = new CollisionDetector(world.player, world.scene);
        this.motionStrategy = new ManualMotionStrategy(world.player, collisionDetector, this.keyboardHandler);
        this.actionStrategy = new ActionStrategy(world.player, world);
        this.keyboardHandler.onDoAction(() => this.actionStrategy.activateClosestMeshAction());
    }
}
