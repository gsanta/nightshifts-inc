import { World } from '../model/game_objects/World';
import { GameObject } from '../model/game_objects/GameObject';
import { StandardMaterial, Color3 } from '@babylonjs/core';
import find from 'lodash/find';
import { Polygon } from '@nightshifts.inc/geometry';
import { VectorModel } from '../model/core/VectorModel';

export class EnemyCreationService {
    private world: World;

    constructor(world: World) {
        this.world = world;

        const rooms = world.getWorldItemsByName('room');

        // if (rooms.length > 1) {
        //     this.createEnemy(rooms[1]);
        // }

        // if (rooms.length > 2) {
        //     this.createEnemy(rooms[2]);
        // }
    }


    public createEnemy(room: GameObject): GameObject {
        const emptyArea = find(room.children, child => child.type === 'empty');

        const material = new StandardMaterial('empty-area-material', this.world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        emptyArea.meshes[0].material = material;

        const centerPoint = emptyArea.boundingBox.getBoundingCenter();
        const vector3 = new VectorModel(centerPoint.x, 0, centerPoint.y);
        const enemyPosition = vector3;

        const rect = Polygon.createRectangle(enemyPosition.x, enemyPosition.z, 1, 1);

        // const enemy =  this.world.factory.createEnemy(rect, this.world);
        // room.children.push(enemy);

        return null;
    }
}
