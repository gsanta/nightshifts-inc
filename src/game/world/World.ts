import { FollowCamera, Light, Scene, SpotLight, StandardMaterial, Engine } from '@babylonjs/core';
import { Vector2Model } from '../model/utils/Vector2Model';
import { ToolMesh } from '../tools/ToolMesh';
import { WorldFactory } from './world_factory/WorldFactory';
import { Enemy } from './world_items/enemy/Enemy';
import { Player } from './world_items/player/Player';
import { Room } from './world_items/room/Room';
import { WorldItem } from './world_items/WorldItem';


export class World {
    public canvas: HTMLCanvasElement;
    public engine: Engine;
    public hemisphericLight: Light;
    public dimensions: Vector2Model;
    public worldItems: WorldItem[];
    public floor: WorldItem;
    public enemies: Enemy[] = [];
    public player: Player = null;
    public rooms: Room[];

    public camera: FollowCamera;

    public tools: ToolMesh[];

    public materials: {[key: string]: StandardMaterial};
    public scene: Scene;

    public getWorldItemsByName(name: string): WorldItem[] {
        return this.worldItems.filter(gameObject => gameObject.type === name);
    }

    public factory: WorldFactory;
}
