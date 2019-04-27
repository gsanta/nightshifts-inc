import { GameActionType } from '../GameActionType';
import { ActionHandler } from '../ActionHandler';
import { World } from '../../world/World';
import { Room } from '../../world/world_items/room/Room';
import _ = require('lodash');
import { Rectangle } from 'game-worldmap-generator';
import { Enemy } from '../../world/world_items/enemy/Enemy';


export class ActiveEnemiesActionHandler implements ActionHandler {
    private  enemy: Enemy;

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.DAY_PASSED:
                if (!this.enemy) {
                    this.enemy = this.createEnemy(world);
                }

                break;
            default:
                break;
        }
    }

    private createEnemy(world: World): Enemy {
        const room = <Room> world.getWorldItemsByName('room')[2];
        const emptyArea = _.find(room.children, child => child.name === 'empty');

        const material = new BABYLON.StandardMaterial('empty-area-material', world.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString('00FF00');
        emptyArea.mesh.material = material;

        const enemyPosition = emptyArea.getCenterPosition();
        const rect = new Rectangle(enemyPosition.x, enemyPosition.z, 1, 1);

        return <Enemy> world.factory.createEnemy(rect, world);
    }
}
