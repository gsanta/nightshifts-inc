import { Scene, Engine } from '@babylonjs/core';
import { AttackingMotionStrategy } from './interactions/motion/AttackingMotionStrategy';
import { CollisionDetector } from './actions/motion_actions/collision_detection/CollisionDetector';
import { World } from './world/World';
import { ActionDispatcher } from './actions/ActionDispatcher';
import { ToolSelectionActionHandler } from './actions/tool_actions/tool_selection_action/ToolSelectionActionHandler';
import { GameActionType } from './actions/GameActionType';
import { ThermometerUpdateHandler } from './actions/tool_actions/thermometer_update_action/ThermometerUpdateHandler';
import { ActiveRoomLightingActionHandler } from './actions/environment_actions/active_room_lightning_action/ActiveRoomLightingActionHandler';
import { TimeActionHandler } from './actions/general_actions/time_action/TimeActionHandler';
import { EnterRoomActionHandler } from './actions/motion_actions/enter_room_action/EnterRoomActionHandler';
import { ActiveEnemiesActionHandler } from './actions/story_actions/active_enemies_action/ActiveEnemiesActionHandler';
import { NormalLightSwitcher } from './actions/environment_actions/active_room_lightning_action/NormalLightSwitcher';
import { EnemyAttackActionHandler } from './actions/motion_actions/enemy_attack_action/EnemyAttackActionHandler';
import { CreateFollowCameraActionHandler } from './actions/environment_actions/create_main_camera_action/CreateFollowCameraActionHandler';
import { CreateMainLightActionHandler } from './actions/environment_actions/create_main_light_action/CreateMainLightActionHandler';
import { EnemyHitActionHandler } from './actions/enemy_hit_action/EnemyHitActionHandler';
import { LampBehaviourActionHandler } from './actions/environment_actions/lamp_behaviour_action/LampBehaviourActionHandler';

(<any> window).earcut = require('earcut');

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
        scene: Scene,
        engine: Engine,
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
    }

    public run() {
        setTimeout(
            () => {
                this.actionDispatcher.registerActionHandler(new CreateFollowCameraActionHandler());
                this.actionDispatcher.registerActionHandler(new CreateMainLightActionHandler());
                this.actionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
                this.actionDispatcher.registerActionHandler(new ToolSelectionActionHandler(this.world.tools));
                this.actionDispatcher.registerActionHandler(new ThermometerUpdateHandler());
                this.actionDispatcher.registerActionHandler(new EnterRoomActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new TimeActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new ActiveEnemiesActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new EnemyAttackActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new EnemyHitActionHandler(this.actionDispatcher));
                this.actionDispatcher.registerActionHandler(new LampBehaviourActionHandler());

                // this.actionDispatcher.registerActionHandler(new RoomReservationAction());

                this.actionDispatcher.dispatch(GameActionType.GAME_IS_READY);
                this.engine.runRenderLoop(() => this.render());
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
