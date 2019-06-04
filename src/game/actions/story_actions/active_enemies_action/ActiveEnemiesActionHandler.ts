import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { ActionDispatcher } from '../../ActionDispatcher';
import find from 'lodash/find';
import { StandardMaterial, Color3 } from '@babylonjs/core';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';
import { Polygon } from '@nightshifts.inc/geometry';

export class ActiveEnemiesActionHandler implements ActionHandler {

    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                const rooms = world.getWorldItemsByName('room');

                if (rooms.length > 1) {
                    const enemy1 = this.createEnemy(world, rooms[1]);
                    this.actionDispatcher.dispatch(GameActionType.ENEMY_CREATED, enemy1);
                }

                if (rooms.length > 2) {
                    const enemy2 = this.createEnemy(world, rooms[2]);
                    this.actionDispatcher.dispatch(GameActionType.ENEMY_CREATED, enemy2);
                }

                break;
            default:
                break;
        }
    }

    private createEnemy(world: World, room: WorldItem): WorldItem {
        const emptyArea = find(room.getChildren(), child => child.type === 'empty');

        const material = new StandardMaterial('empty-area-material', world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        emptyArea.mesh.material = material;

        const enemyPosition = emptyArea.getCenterPosition();

        const rect = Polygon.createRectangle(enemyPosition.x, enemyPosition.z, 1, 1);

        const enemy =  world.factory.createEnemy(rect, world);
        room.addChild(enemy);

        return enemy;
    }
}
