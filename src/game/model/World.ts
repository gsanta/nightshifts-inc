import { VisualWorldItem } from '../world_items/VisualWorldItem';
import { Enemy } from './creature/type/Enemy';
import { Player } from './creature/type/Player';
import { LightController } from './light/LightController';
import { Vector2Model } from './utils/Vector2Model';
import { FollowCamera } from 'babylonjs';
import { Room } from './creature/type/Room';


export class World {
    public dimensions: Vector2Model;
    public gameObjects: VisualWorldItem[];
    public floor: VisualWorldItem;
    public enemies: Enemy[] = [];
    public player: Player = null;
    public rooms: Room[];

    public camera: FollowCamera;

    public lightController: LightController;
}
