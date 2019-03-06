import { WorldItem } from '../world_items/WorldItem';
import { Enemy } from './creature/type/Enemy';
import { Player } from './creature/type/Player';
import { LightController } from './light/LightController';
import { Vector2Model } from './utils/Vector2Model';
import { FollowCamera } from 'babylonjs';
import { Room } from './creature/type/Room';


export class World {
    public dimensions: Vector2Model;
    public gameObjects: WorldItem[];
    public floor: WorldItem;
    public enemies: Enemy[] = [];
    public player: Player = null;
    public rooms: Room[];

    public camera: FollowCamera;

    public lightController: LightController;
}
