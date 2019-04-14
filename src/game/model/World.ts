import { WorldItem } from '../world_items/WorldItem';
import { Enemy } from './creature/type/Enemy';
import { Player } from './creature/type/Player';
import { LightController } from './light/LightController';
import { Vector2Model } from './utils/Vector2Model';
import { FollowCamera, Light, SpotLight } from 'babylonjs';
import { ContainerWorldItem } from '../../engine/world_items/ContainerWorldItem';
import { Tool } from '../../client/gui/components/dialogs/inventory/Tool';


export class World {
    public hemisphericLight: Light;
    public nightLight: Light;
    public dimensions: Vector2Model;
    public gameObjects: WorldItem[];
    public floor: WorldItem;
    public enemies: Enemy[] = [];
    public player: Player = null;
    public rooms: ContainerWorldItem[];

    public camera: FollowCamera;

    public lightController: LightController;

    public tools: Tool[];
    public spotLight: SpotLight;
}
