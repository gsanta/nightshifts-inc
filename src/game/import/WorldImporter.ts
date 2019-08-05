import { Scene } from '@babylonjs/core';
import { BabylonConverter, BabylonImporter, WorldItemInfo } from '@nightshifts.inc/world-generator';
import { Promise } from 'es6-promise';
import { Vector2Model } from '../model/utils/Vector2Model';
import { FlashlightTool } from '../tools/FlashlightTool';
import { ThermometerTool } from '../tools/ThermometerTool';
import { World } from '../model/game_objects/World';
import { GameObjectFactory } from './GameObjectFactory';
import { Border } from '../model/game_objects/Border';
import { GameObject } from '../model/game_objects/GameObject';
import { Room } from '../model/game_objects/Room';

export class WorldImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    private createWorld(rootWorldItem: WorldItemInfo[]): World {
        let world = new World();

        world.scene = this.scene;
        world.dimensions = new Vector2Model(rootWorldItem[0].dimensions.getBoundingInfo().extent[0], rootWorldItem[0].dimensions.getBoundingInfo().extent[1]);

        world.worldItems = this.createWorldItems(rootWorldItem, world);

        world.tools = [
            new ThermometerTool(this.scene, world.player),
            new FlashlightTool(this.scene, world)
        ];

        return world;
    }

    private createWorldItems(rootWorldItem: WorldItemInfo[], world: World): GameObject[] {
        const gameObjects: GameObject[] = [];

        const gameObjectFactory = new GameObjectFactory();
        new BabylonConverter<GameObject>().convert(
            rootWorldItem,
            (worldItemInfo: WorldItemInfo) => {
                const gameObject = gameObjectFactory.getInstance(worldItemInfo);
                gameObjects.push(gameObject);
                return gameObject;
            },
            (parent: GameObject, children: GameObject[]) => {
                parent.children = children;
            },
            (item: GameObject, borders: GameObject[]) => {
                (<Room> item).borders = <Border[]> borders;
            });

        world.floor = gameObjects.filter(mesh => mesh.type === 'floor')[0];
        world.player = gameObjects.filter(mesh => mesh.type === 'player')[0];

        return gameObjects;
    }

    public import(strWorld: string): Promise<World> {

        return <any> new BabylonImporter(this.scene as any)
            .import(
                strWorld,
                [
                    {
                        type: 'player',
                        model: 'file' as any,
                        fileDescription: {
                            path: 'models/player/',
                            fileName: 'player.babylon',
                            materials: [
                                'models/player/material/0.jpg',
                                'models/player/material/1.jpg',
                                'models/player/material/2.jpg',
                                'models/player/material/3.jpg'
                            ],
                            scale: 0.28
                        }
                    },
                    {
                        type: 'door',
                        model: 'file',
                        fileDescription: {
                            path: 'models/',
                            fileName: 'door.babylon',
                            scale: 1
                        }
                    },
                    {
                        type: 'window',
                        model: 'file',
                        fileDescription: {
                            path: 'models/',
                            fileName: 'window.babylon',
                            scale: 1
                        }
                    },
                    {
                        type: 'bed',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_1/',
                            fileName: 'bed.babylon',
                            materials: ['models/furniture_1/material/beds.png'],
                            scale: 0.03
                        }
                    },
                    {
                        type: 'washbasin',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_3/',
                            fileName: 'wash_basin.babylon',
                            materials: ['models/furniture_3/material/bathroom.png'],
                            scale: 3
                        }
                    },
                    {
                        type: 'bathtub',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_3/',
                            fileName: 'bathtub.babylon',
                            materials: ['models/furniture_3/material/bathroom.png'],
                            scale: 3
                        }
                    },
                    {
                        type: 'chair',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_3/',
                            fileName: 'chair.babylon',
                            materials: ['models/furniture_3/material/bathroom.png'],
                            scale: 3
                        }
                    },
                    {
                        type: 'table',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_2/',
                            fileName: 'table.babylon',
                            materials: ['models/furniture_2/material/furniture.png'],
                            scale: 0.03
                        }
                    },
                    {
                        type: 'cupboard',
                        model: 'file',
                        fileDescription: {
                            path: 'models/furniture_2/',
                            fileName: 'cupboard.babylon',
                            materials: ['models/furniture_2/material/furniture.png'],
                            scale: 0.03
                        }
                    }
                ]
            )
            .then(worldItemInfo => this.createWorld(worldItemInfo));
    }
}