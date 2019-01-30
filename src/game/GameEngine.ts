import { Scene, Engine } from 'babylonjs';
import { AttackingMotionStrategy } from './model/creature/motion/AttackingMotionStrategy';
import { CollisionDetector } from './model/creature/collision/CollisionDetector';
import { World } from './model/World';
import { JsonWorldGenerator } from './io/json_world_io/import/JsonWorldGenerator';
import { JsonMeshFactoryProducer } from './io/json_world_io/import/JsonMashFactoryProducer';

export class GameEngine {
    private scene: Scene;
    private world: World;
    private previousTime: number = Date.now();
    private engine: Engine;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.run = this.run.bind(this);
        const engine = new BABYLON.Engine(canvas);
        this.engine = engine;
        engine.enableOfflineSupport = false;

        this.scene = new BABYLON.Scene(engine);
        this.scene.collisionsEnabled = true;
    }

    public runGame(strWorld: string) {
        // const meshFactoryProducer = new GwmMeshFactoryProducer();

        // new GwmWorldGenerator(this.scene, this.canvas, meshFactoryProducer)
        //     .create(strWorld)
        //     .then((worldMap) => {
        //         this.worldMap = worldMap;
        //         this.engine.runRenderLoop(this.run);
        //     })
        //     .catch(e => console.error(e));

        const meshFactoryProducer = new JsonMeshFactoryProducer();
        new JsonWorldGenerator(this.scene, this.canvas, meshFactoryProducer)
            .create(strWorld)
            .then((world) => {
                this.world = world;
                this.engine.runRenderLoop(this.run);
            })
            .catch(e => console.error(e));
    }

    public getWorld() {
        return this.world;
    }

    private run() {
        if (!this.world.player || !this.world.player.getBody()) {
            return;
        }

        const currentTime = Date.now();
        const elapsedTime = currentTime - this.previousTime;
        this.previousTime = currentTime;

        this.world.lightController.timePassed(elapsedTime);

        this.movePlayer(elapsedTime);
        // this.moveEnemies(elapsedTime);
        // this.testAndSetEnemyVisibility();
        // this.attackPlayerIfWithinSensorRange();

        this.scene.render();
    }

    private testAndSetEnemyVisibility() {
        const player = this.world.player;

        this.world.enemies.forEach(enemy => {
            const isVisible = player.getSensor().testIsWithinRange(this.world.enemies[0]);
            if (isVisible) {
                enemy.setIsVisible(true);
            } else {
                enemy.setIsVisible(false);
            }
        });
    }

    private movePlayer(elapsedTime: number) {
        const player = this.world.player;

        if (!player.getMotionStrategy().isIdle()) {
            const delta = player.getMotionStrategy().calcNextPositionDelta(elapsedTime);
            player.setPosition(player.getPosition().add(delta));
        }

        const rotationDelta = player.getMotionStrategy().calcNextRotationDelta(elapsedTime);
        player.setRotation(rotationDelta);
    }

    private moveEnemies(elapsedTime: number) {
        this.world.enemies.forEach(enemy => {
            const enemyDelta = enemy.getMotionStrategy().calcNextPositionDelta(elapsedTime);

            if (enemyDelta) {
                enemy.setPosition(enemy.getPosition().add(enemyDelta));
            }
        });
    }

    private attackPlayerIfWithinSensorRange() {
        const player = this.world.player;

        this.world.enemies.forEach(enemy => {
            if (enemy.getSensor().testIsWithinRange(player)) {
                const collisionDetector = new CollisionDetector(enemy, this.scene);
                enemy.setMotionStrategy(new AttackingMotionStrategy(enemy, player, collisionDetector));
            }
        });
    }
}
