import { ActionHandler } from '../ActionHandler';
import { Enemy } from '../../world/world_items/enemy/Enemy';
import { World } from '../../world/World';
import { GameActionType } from '../GameActionType';


export class EnemyHitActionHandler implements ActionHandler {

    public handle(type: string, world: World, enemy: Enemy) {
        switch (type) {
            case GameActionType.ENEMY_MOVED:
                if (enemy.intersectsWorldItem(world.player)) {
                    alert('intersection')
                }
                break;
            default:
                break;
        }
    }
}
