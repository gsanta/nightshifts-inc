import { FollowCamera, Light, Scene, SpotLight, StandardMaterial, Engine } from '@babylonjs/core';
import { Vector2Model } from '../model/utils/Vector2Model';
import { Tool } from '../tools/Tool';
import { WorldFactory } from './world_factory/WorldFactory';
import { Enemy } from './world_items/item_types/Enemy';
import { Room } from './world_items/item_types/Room';
import { WorldItem } from './world_items/item_types/WorldItem';
import { Player } from './world_items/item_types/Player';


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

    public tools: Tool[];

    public materials: {[key: string]: StandardMaterial};
    public scene: Scene;

    public getWorldItemsByName(name: string): WorldItem[] {
        return this.worldItems.filter(gameObject => gameObject.type === name);
    }

    public factory: WorldFactory;
}
