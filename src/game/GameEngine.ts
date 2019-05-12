import { Scene, Engine } from '@babylonjs/core';
import { World } from './world/World';
import { ActionDispatcher } from './actions/ActionDispatcher';
import { ToolSelectionActionHandler } from './actions/tool_actions/tool_selection_action/ToolSelectionActionHandler';
import { GameActionType } from './actions/GameActionType';
import { ThermometerUpdateHandler } from './actions/tool_actions/thermometer_update_action/ThermometerUpdateHandler';
import { ActiveRoomLightingActionHandler } from './actions/environment_actions/active_room_lightning_action/ActiveRoomLightingActionHandler';
import { TimeActionHandler } from './actions/general_actions/time_action/TimeActionHandler';
import { EnterRoomActionHandler } from './actions/motion_actions/enter_room_action/EnterRoomActionHandler';
import { ActiveEnemiesActionHandler } from './actions/story_actions/active_enemies_action/ActiveEnemiesActionHandler';
import { EnemyAttackActionHandler } from './actions/motion_actions/enemy_attack_action/EnemyAttackActionHandler';
import { CreateFollowCameraActionHandler } from './actions/environment_actions/create_main_camera_action/CreateFollowCameraActionHandler';
import { CreateMainLightActionHandler } from './actions/environment_actions/create_main_light_action/CreateMainLightActionHandler';
import { EnemyHitActionHandler } from './actions/enemy_hit_action/EnemyHitActionHandler';
import { LampBehaviourActionHandler } from './actions/environment_actions/lamp_behaviour_action/LampBehaviourActionHandler';
import { PlayerMotionActionHandler } from './actions/motion_actions/player_motion_action/PlayerMotionActionHandler';
import { CreateBoundingPolygonMeshesActionHandler } from './actions/debug_actions/CreateBoundingPolygonMeshesActionHandler';

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

    public run(actionDispatcher: ActionDispatcher) {
        setTimeout(
            () => {
                actionDispatcher.registerActionHandler(new CreateFollowCameraActionHandler());
                actionDispatcher.registerActionHandler(new CreateMainLightActionHandler());
                actionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
                actionDispatcher.registerActionHandler(new ToolSelectionActionHandler(this.world.tools));
                actionDispatcher.registerActionHandler(new ThermometerUpdateHandler());
                actionDispatcher.registerActionHandler(new EnterRoomActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new TimeActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new ActiveEnemiesActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new EnemyAttackActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new EnemyHitActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new LampBehaviourActionHandler());
                actionDispatcher.registerActionHandler(new PlayerMotionActionHandler(actionDispatcher));
                actionDispatcher.registerActionHandler(new CreateBoundingPolygonMeshesActionHandler());

                // this.actionDispatcher.registerActionHandler(new RoomReservationAction());

                actionDispatcher.dispatch(GameActionType.GAME_IS_READY);
                this.engine.runRenderLoop(() => this.render(actionDispatcher));
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

    private render(actionDispatcher: ActionDispatcher) {
        actionDispatcher.dispatch(GameActionType.NEXT_TICK);

        this.scene.render();
    }
}
