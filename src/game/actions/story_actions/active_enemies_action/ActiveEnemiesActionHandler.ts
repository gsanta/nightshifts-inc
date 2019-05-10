import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { Room } from '../../../world/world_items/item_types/room/Room';
import { Enemy } from '../../../world/world_items/enemy/Enemy';
import { ActionDispatcher } from '../../ActionDispatcher';
import { Rectangle } from '@nightshifts.inc/geometry';
import find from 'lodash/find';
import { StandardMaterial, Color3 } from '@babylonjs/core';

export class ActiveEnemiesActionHandler implements ActionHandler {

    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                const rooms = <Room[]> world.getWorldItemsByName('room');
                const enemy1 = this.createEnemy(world, rooms[1]);
                this.actionDispatcher.dispatch(GameActionType.ENEMY_CREATED, enemy1);
                const enemy2 = this.createEnemy(world, rooms[2]);
                this.actionDispatcher.dispatch(GameActionType.ENEMY_CREATED, enemy2);

                break;
            default:
                break;
        }
    }

    private createEnemy(world: World, room: Room): Enemy {
        const emptyArea = find(room.children, child => child.type === 'empty');

        const material = new StandardMaterial('empty-area-material', world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        emptyArea.mesh.material = material;

        const enemyPosition = emptyArea.getCenterPosition();

        const rect = new Rectangle(enemyPosition.x, enemyPosition.z, 1, 1);

        const enemy = <Enemy> world.factory.createEnemy(rect, world);
        room.addChild(enemy);

        return enemy;
    }
}
