import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { Room } from '../../../world/world_items/room/Room';
import { Enemy } from '../../../world/world_items/enemy/Enemy';
import { ActionDispatcher } from '../../ActionDispatcher';
import { Rectangle } from '@nightshifts.inc/geometry';
import find from 'lodash/find';

export class ActiveEnemiesActionHandler implements ActionHandler {
    private  enemy: Enemy;

    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.DAY_PASSED:
                if (!this.enemy) {
                    this.enemy = this.createEnemy(world);
                    this.actionDispatcher.dispatch(GameActionType.ENEMY_CREATED, this.enemy);
                }

                break;
            default:
                break;
        }
    }

    private createEnemy(world: World): Enemy {
        const room = <Room> world.getWorldItemsByName('room')[1];
        const emptyArea = find(room.children, child => child.name === 'empty');

        const material = new BABYLON.StandardMaterial('empty-area-material', world.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString('00FF00');
        emptyArea.mesh.material = material;

        const enemyPosition = emptyArea.getCenterPosition();

        const rect = new Rectangle(enemyPosition.x, enemyPosition.z, 1, 1);

        const enemy = <Enemy> world.factory.createEnemy(rect, world);
        room.addChild(enemy);

        return enemy;
    }
}
