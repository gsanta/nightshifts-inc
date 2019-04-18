import { Scene, Engine } from 'babylonjs';
import { AttackingMotionStrategy } from './model/creature/motion/AttackingMotionStrategy';
import { CollisionDetector } from './model/creature/collision/CollisionDetector';
import { World } from './model/World';
import { AbstractWorldImporter } from './io/AbstractWorldImporter';
import { ActionDispatcher } from '../engine/actions/ActionDispatcher';
import { ToolSelectionActionHandler } from './actions/handlers/ToolSelectionActionHandler';
import { GameActionType } from './actions/GameActionType';
import { ThermometerUpdateHandler } from './actions/handlers/ThermometerUpdateHandler';
import { EnterRoomActionHandler } from './actions/handlers/EnterRoomActionHandler';
import { ActiveRoomLightingActionHandler } from './actions/handlers/ActiveRoomLightingActionHandler';
import { Timer } from './actions/handlers/Timer';
import { TimeActionHandler } from './actions/handlers/TimeActionHandler';

export class GameEngine {
    private scene: Scene;
    private world: World;
    private previousTime: number = Date.now();
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private isGameRunning = false;
    private actionDispatcher: ActionDispatcher;
    private timer: Timer;

    constructor(
        canvas: HTMLCanvasElement,
        scene: BABYLON.Scene,
        engine: BABYLON.Engine,
        world: World,
        actionDispatcher: ActionDispatcher
    ) {
        this.canvas = canvas;
        this.run = this.run.bind(this);
        this.engine = engine;
        engine.enableOfflineSupport = false;

        this.scene = scene;
        this.scene.collisionsEnabled = true;
        this.world = world;
        this.actionDispatcher = actionDispatcher;

        setTimeout(
            () => {
                this.actionDispatcher.registerActionHandler(new ActiveRoomLightingActionHandler());
                this.actionDispatcher.registerActionHandler(new ToolSelectionActionHandler(this.world.tools));
                this.actionDispatcher.registerActionHandler(new ThermometerUpdateHandler());
                this.actionDispatcher.registerActionHandler(new EnterRoomActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new TimeActionHandler(this.actionDispatcher));
            },
            100
        );
    }

    public run() {
        // const meshFactoryProducer = new GwmMeshFactoryProducer();

        // new GwmWorldGenerator(this.scene, this.canvas, meshFactoryProducer)
        //     .create(strWorld)
        //     .then((worldMap) => {
        //         this.worldMap = worldMap;
        //         this.engine.runRenderLoop(this.run);
        //     })
        //     .catch(e => console.error(e));
        this.actionDispatcher.dispatch(GameActionType.GAME_IS_READY);
        this.engine.runRenderLoop(() => this.render());
    }

    public isRunning(): boolean {
        return this.isGameRunning;
    }

    public getWorld() {
        return this.world;
    }

    private render() {
        if (!this.world.player || !this.world.player.getBody()) {
            return;
        }

        const currentTime = Date.now();
        const elapsedTime = currentTime - this.previousTime;
        this.previousTime = currentTime;

        this.world.lightController.timePassed(elapsedTime);

        this.movePlayer(elapsedTime);
        // this.actionDispatcher.dispatch(GameActionType.NEXT_TICK, this.timer.getDelta());
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
            player.setPosition(player.mesh.getPosition().add(delta));
        }

        const rotationDelta = player.getMotionStrategy().calcNextRotationDelta(elapsedTime);
        player.setRotation(rotationDelta);
    }

    private moveEnemies(elapsedTime: number) {
        this.world.enemies.forEach(enemy => {
            const enemyDelta = enemy.getMotionStrategy().calcNextPositionDelta(elapsedTime);

            if (enemyDelta) {
                enemy.setPosition(enemy.mesh.getPosition().add(enemyDelta));
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
