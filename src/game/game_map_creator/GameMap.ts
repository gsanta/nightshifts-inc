import { MeshModel } from '../model/core/MeshModel';
import { Enemy } from '../model/creature/type/Enemy';
import { Player } from '../model/creature/type/Player';


export class GameMap {
    public gameObjects: MeshModel[];
    public enemies: Enemy[] = [];
    public player: Player = null;
}
