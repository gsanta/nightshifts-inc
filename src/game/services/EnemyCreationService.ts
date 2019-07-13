import { World } from '../world/World';
import { WorldItem } from '../world/world_items/item_types/WorldItem';
import { StandardMaterial, Color3 } from '@babylonjs/core';
import find from 'lodash/find';
import { Polygon } from '@nightshifts.inc/geometry';

export class EnemyCreationService {


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
