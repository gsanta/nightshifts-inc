import { Scene, Vector2 } from 'babylonjs';
import { FlashlightTool } from '../tools/FlashlightTool';
import { ThermometerTool } from '../tools/ThermometerTool';
import { World } from '../model/game_objects/World';
import { GameObjectFactory } from './GameObjectFactory';
import { Border } from '../model/game_objects/Border';
import { GameObject } from '../model/game_objects/GameObject';
import { Room } from '../model/game_objects/Room';
import { PortalTool } from '../tools/PortalTool';
import { BabylonWorldGenerator, WorldItem } from '@nightshifts.inc/world-generator';
import { meshDescriptors } from './meshDescriptors';

export class WorldImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public import(strWorld: string): void {
        let world = new World();
        const gameObjects: GameObject[] = [];
        const gameObjectFactory = new GameObjectFactory();

        new BabylonWorldGenerator(this.scene)
            .generate(
                strWorld,
                {
                    meshDescriptors: meshDescriptors,
                    borders: ['wall', 'door', 'window'],
                    furnitures: ['empty', 'player', 'cupboard', 'table', 'bathtub', 'washbasin', 'bed', 'chair', 'portal'],
                    xScale: 1,
                    yScale: 2
                },
                {
                    convert(worldItem: WorldItem): any {
                        if (worldItem.name === 'root') {
                            world.dimensions = new Vector2(worldItem.dimensions.getBoundingInfo().extent[0], worldItem.dimensions.getBoundingInfo().extent[1]);

                        }
                        const gameObject = gameObjectFactory.getInstance(worldItem, world);
                        gameObjects.push(gameObject);
                        return gameObject;
                    },
                    addChildren(parent: GameObject, children: GameObject[]): void {
                        parent.children = children;
                    },
                    addBorders(item: GameObject, borders: GameObject[]): void {
                        (<Room> item).borders = <Border[]> borders;
                    },
                    done() {
                        world.worldItems = gameObjects;
                        world.floor = world.worldItems.filter(mesh => mesh.type === 'floor')[0];
                        world.player = world.worldItems.filter(mesh => mesh.type === 'player')[0];
                        world.scene = this.scene;

                        world.rooms = <Room[]> world.getWorldItemsByType('room');

                        world.tools = [
                            new PortalTool(world),
                            new ThermometerTool(this.scene, world.player),
                            new FlashlightTool(this.scene, world)
                        ];


                        this.setupWorld(world);
                    }
                }
            );
    }
}
