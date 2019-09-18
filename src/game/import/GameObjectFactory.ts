import { GameObject } from '../model/game_objects/GameObject';
import { Border } from '../model/game_objects/Border';
import { Room } from '../model/game_objects/Room';
import { Mesh } from 'babylonjs';
import { World } from '../model/game_objects/World';
import { WorldItem } from '@nightshifts.inc/world-generator';

export class GameObjectFactory {
    private roomCounter = 0;

    getInstance(worldItemInfo: WorldItem, world: World): GameObject {
        switch (worldItemInfo.name) {
            case 'root':
                return new GameObject(null, null, {type: 'floor'});
            case 'wall':
                return new Border(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'wall'});
            case 'door':
            case 'window':
                const animatedMeshes = this.filterAnimatedMeshes(<Mesh[]> (<Mesh> worldItemInfo.meshTemplate.meshes[0]).getChildMeshes());
                const border = new Border(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: worldItemInfo.name});
                border.animatedMeshes = animatedMeshes;
                return border;
            case 'player':
                const player = new GameObject(
                    worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'player', skeleton: worldItemInfo.skeleton});
                player.health = 100;
                return player;
            case 'room':
                this.roomCounter++;
                const room = new Room(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, world);

                if (this.roomCounter > 5) {
                    room.lightsWorking = false;
                }
                return room;
            case 'empty':
                return new GameObject(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'empty'});
            case 'washbasin':
            case 'table':
            case 'cupboard':
            case 'bathtub':
            case 'chair':
            case 'bed':
            case 'portal':
                const gameObject = new GameObject(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: worldItemInfo.name});
                gameObject.meshes[0].isVisible = false;
                return gameObject;
            default:
                throw new Error('Unsupported type: ' + worldItemInfo.name);
        }
    }

    private getWall(worldItemInfo: WorldItem): GameObject {
        if (worldItemInfo.children.length === 2) {
            const border = new Border(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'wall'});
            border.meshes.forEach(mesh => mesh.isVisible = false);
            return border;
        } else {
            return new GameObject(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'wall'});
        }
    }

    private filterAnimatedMeshes(meshes: Mesh[]): Mesh[] {
        return meshes.filter(mesh => mesh.animations.length > 0);
    }
}
