import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameObject } from '../world_items/item_types/GameObject';
import { Border } from '../world_items/item_types/Border';
import { Room } from '../world_items/item_types/Room';
import { MeshBuilder, Mesh } from '@babylonjs/core';

export class GameObjectFactory {

    getInstance(worldItemInfo: WorldItemInfo): GameObject {
        switch (worldItemInfo.name) {
            case 'root':
                return new GameObject(null, null, {type: 'floor'});
            case 'wall':
                return new Border(worldItemInfo.mesh, worldItemInfo.dimensions, {type: 'wall'});
            case 'player':
                const player = new GameObject(this.createMesh(), worldItemInfo.dimensions, {type: 'player', skeleton: worldItemInfo.skeleton});
                player.health = 100;
                return player;
            case 'room':
                return new Room(this.createMesh(), worldItemInfo.dimensions);
            case 'empty':
                return new GameObject(this.createMesh(), worldItemInfo.dimensions, {type: 'empty'});
            default:
                throw new Error('Unsupported type: ' + worldItemInfo.type);
        }
    }

    private createMesh(): Mesh {
        const mesh = MeshBuilder.CreateBox('box', {width: 1, height: 1});
        mesh.isVisible = false;
        return mesh;
    }
}
