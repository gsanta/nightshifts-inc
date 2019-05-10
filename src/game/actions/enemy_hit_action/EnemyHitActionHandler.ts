import { ActionHandler } from '../ActionHandler';
import { Enemy } from '../../world/world_items/item_types/Enemy';
import { World } from '../../world/World';
import { GameActionType } from '../GameActionType';
import { ActionDispatcher } from '../ActionDispatcher';

export class EnemyHitActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }


    public handle(type: string, world: World, enemy: Enemy) {
        switch (type) {
            case GameActionType.ENEMY_MOVED:
                if (enemy.intersectsWorldItem(world.player)) {
                    this.actionDispatcher.dispatch(GameActionType.ENEMY_STRIKED, enemy);
                    world.player.health = world.player.health - 30;
                }
                break;
            default:
                break;
        }
    }
}
