import { Scene, Engine } from '@babylonjs/core';
import { World } from './model/game_objects/World';

(<any> window).earcut = require('earcut');

export class GameEngine {
    private scene: Scene;
    private world: World;
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private isGameRunning = false;

    constructor(
        canvas: HTMLCanvasElement,
        scene: Scene,
        engine: Engine,
        world: World,
    ) {
        this.canvas = canvas;
        this.run = this.run.bind(this);
        this.engine = engine;
        engine.enableOfflineSupport = false;

        this.scene = scene;
        this.scene.collisionsEnabled = true;
        this.world = world;
        this.world.canvas = this.canvas;
        this.world.engine = engine;
    }

    public run() {
        setTimeout(
            () => {
                this.engine.runRenderLoop(() => this.scene.render());
            },
            100
        );
    }

    public isRunning(): boolean {
        return this.isGameRunning;
    }

    public getWorld() {
        return this.world;
    }
}
