import { WorldItem } from '../world_items/WorldItem';
import { Enemy } from './world_items/Enemy';
import { Player } from './world_items/Player';
import { LightController } from './light/LightController';
import { Vector2Model } from './utils/Vector2Model';
import { FollowCamera, Light, SpotLight, StandardMaterial } from 'babylonjs';
import { ContainerWorldItem } from '../../engine/world_items/ContainerWorldItem';
import { Tool } from '../tools/Tool';
import { ToolMesh } from '../../engine/tools/ToolMesh';
import { Room } from '../../engine/world_items/Room';


export class World {
    public hemisphericLight: Light;
    public nightLight: Light;
    public dimensions: Vector2Model;
    public gameObjects: WorldItem[];
    public floor: WorldItem;
    public enemies: Enemy[] = [];
    public player: Player = null;
    public rooms: Room[];

    public camera: FollowCamera;

    public lightController: LightController;

    public tools: ToolMesh[];
    public spotLight: SpotLight;

    public materials: {[key: string]: StandardMaterial};
}
