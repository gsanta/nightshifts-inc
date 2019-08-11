import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameObject } from '../model/game_objects/GameObject';
import { Border } from '../model/game_objects/Border';
import { Room } from '../model/game_objects/Room';
import { MeshBuilder, Mesh } from 'babylonjs';

export class GameObjectFactory {

    getInstance(worldItemInfo: WorldItemInfo): GameObject {
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
                return new Room(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions);
            case 'empty':
                return new GameObject(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: 'empty'});
            case 'washbasin':
            case 'table':
            case 'cupboard':
            case 'bathtub':
            case 'chair':
            case 'bed':
            case 'portal':
                return new GameObject(worldItemInfo.meshTemplate.meshes, worldItemInfo.dimensions, {type: worldItemInfo.name});
            default:
                throw new Error('Unsupported type: ' + worldItemInfo.name);
        }
    }

    private filterAnimatedMeshes(meshes: Mesh[]): Mesh[] {
        return meshes.filter(mesh => mesh.animations.length > 0);
    }
}
