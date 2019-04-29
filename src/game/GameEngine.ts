import { Scene, Engine } from 'babylonjs';
import { AttackingMotionStrategy } from './interactions/motion/AttackingMotionStrategy';
import { CollisionDetector } from './interactions/collision/CollisionDetector';
import { World } from './world/World';
import { ActionDispatcher } from './actions/ActionDispatcher';
import { ToolSelectionActionHandler } from './actions/tool_selection_action/ToolSelectionActionHandler';
import { GameActionType } from './actions/GameActionType';
import { ThermometerUpdateHandler } from './actions/thermometer_update_action/ThermometerUpdateHandler';
import { ActiveRoomLightingActionHandler } from './actions/active_room_lightning_action/ActiveRoomLightingActionHandler';
import { TimeActionHandler } from './actions/time_action/TimeActionHandler';
import { EnterRoomActionHandler } from './actions/enter_room_action/EnterRoomActionHandler';
import { ActiveEnemiesActionHandler } from './actions/active_enemies_action/ActiveEnemiesActionHandler';
import { LightHandler } from './world/world_items/room/LightHandler';
import { EnemyAttackActionHandler } from './actions/enemy_attack_action/EnemyAttackActionHandler';
import 'babylonjs-loaders';

export class GameEngine {
    private scene: Scene;
    private world: World;
    private previousTime: number = Date.now();
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private isGameRunning = false;
    private actionDispatcher: ActionDispatcher;

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
                this.actionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
                this.actionDispatcher.registerActionHandler(new ToolSelectionActionHandler(this.world.tools));
                this.actionDispatcher.registerActionHandler(new ThermometerUpdateHandler());
                this.actionDispatcher.registerActionHandler(new EnterRoomActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new TimeActionHandler(this.actionDispatcher));
                // this.actionDispatcher.registerActionHandler(new ActiveEnemiesActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new EnemyAttackActionHandler());
                // this.actionDispatcher.registerActionHandler(new RoomReservationAction());

                this.actionDispatcher.dispatch(GameActionType.GAME_IS_READY);
            },
            100
        );
    }

    public run() {
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

        this.movePlayer(elapsedTime);
        this.actionDispatcher.dispatch(GameActionType.NEXT_TICK);


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
            player.setPosition(player.getCenterPosition().add(delta));
        }

        const rotationDelta = player.getMotionStrategy().calcNextRotationDelta(elapsedTime);
        player.setRotation(rotationDelta);
    }

    private moveEnemies(elapsedTime: number) {
        this.world.enemies.forEach(enemy => {
            const enemyDelta = enemy.getMotionStrategy().calcNextPositionDelta(elapsedTime);

            if (enemyDelta) {
                enemy.setPosition(enemy.getCenterPosition().add(enemyDelta));
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
