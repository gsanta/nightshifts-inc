import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { Enemy } from '../../../world/world_items/item_types/Enemy';
import { Room } from '../../../world/world_items/item_types/Room';
import { CollisionDetector } from '../collision_detection/CollisionDetector';
import find from 'lodash/find';
import { VectorModel } from '../../../model/core/VectorModel';
import { ActionDispatcher } from '../../ActionDispatcher';
import { Rectangle } from '@nightshifts.inc/geometry';

export class EnemyAttackActionHandler implements ActionHandler {
    private enemy: Enemy;
    private activeRoom: Room;
    private collisionDetector: CollisionDetector;
    private actionDispatcher: ActionDispatcher;
    private attacking = false;
    private enemyMotionState: 'idle' | 'attacking' | 'returning' = 'idle';
    private initialPosition: VectorModel;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World, enemy: Enemy) {
        switch (type) {
            case GameActionType.ENEMY_CREATED:
                this.enemy = enemy;
                this.collisionDetector = new CollisionDetector(this.enemy, world.scene);
                break;

            case GameActionType.ENTER_ROOM:
                const activeRoom = <Room> find(world.getWorldItemsByName('room'), (room: Room) => room.isActive);

                if (this.enemy && activeRoom === this.enemy.parent) {
                    this.enemyMotionState = 'attacking';
                    const center = this.enemy.getBoundingPolygon().getBoundingCenter();
                    this.initialPosition = new VectorModel(center.x, 0, center.y);
                }

                break;

            case GameActionType.ENEMY_STRIKED:
                this.attacking = false;
                this.enemyMotionState = 'returning';
                break;
            case GameActionType.NEXT_TICK:
                if (this.enemy) {
                    if (this.enemyMotionState === 'attacking') {
                        this.calcNextPositionDelta(world);

                        this.actionDispatcher.dispatch(GameActionType.ENEMY_MOVED, this.enemy);
                    } else if (this.enemyMotionState === 'returning') {
                        this.calcNextPositionForReturning(world);
                    }

                }
                break;
            default:
                break;
        }
    }

    private calcNextPositionDelta(world: World): void {
        const target = world.player;
        let distance = 0.5;
        const destination = target.getCenterPosition();
        const center = this.enemy.getBoundingPolygon().getBoundingCenter();
        const currentPosition = new VectorModel(center.x, 0, center.y);

        const direction = destination.subtract(currentPosition).normalize();

        const delta = direction.scale(distance);

        const adjustedDelta = this.collisionDetector.getAdjustedDelta(delta);

        this.enemy.setPosition(currentPosition.add(adjustedDelta));

    }

    private calcNextPositionForReturning(world: World) {
        const target = world.player;
        let distance = 0.5;
        const destination = this.initialPosition;
        const center = this.enemy.getBoundingPolygon().getBoundingCenter();
        const currentPosition = new VectorModel(center.x, 0, center.y);

        const direction = destination.subtract(currentPosition).normalize();

        const delta = direction.scale(distance);

        const adjustedDelta = this.collisionDetector.getAdjustedDelta(delta);

        this.enemy.setPosition(currentPosition.add(adjustedDelta));
    }
}
