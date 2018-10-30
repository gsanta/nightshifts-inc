import { Scene, Engine } from 'babylonjs';
import { FieldMap } from './model/field/FieldMap';
import { createLevel1FieldMap } from './levels/createLevel1FieldMap';
import { VectorModel } from './model/core/VectorModel';
import { AttackingMotionStrategy } from './model/creature/motion/AttackingMotionStrategy';


export class GameEngine {
    private scene: Scene;
    private fieldMap: FieldMap;
    private previousTime: number;
    private engine: Engine;

    constructor(canvas: HTMLCanvasElement) {
        this.run = this.run.bind(this);
        const engine = new BABYLON.Engine(canvas);
        this.engine = engine;
        engine.enableOfflineSupport = false;

        this.scene = new BABYLON.Scene(engine);
        this.scene.collisionsEnabled = true;

        this.fieldMap = createLevel1FieldMap(this.scene);
    }

    public runRenderLoop() {
        this.engine.runRenderLoop(this.run);
    }

    private run() {
        if (!this.fieldMap.getPlayer().getBody()) {
            return
        }
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.previousTime;
        this.previousTime = currentTime;
        let delta = new VectorModel(0, 0, 0);

        const player = this.fieldMap.getPlayer();

        player.getSensor().testIsWithinRange(this.fieldMap.getEnemies()[0]);

        if (!player.getMotionStrategy().isIdle()) {
            delta = player.getMotionStrategy().getNextPosition(elapsedTime);

            let rotation = player.getBody().rotationQuaternion.toEulerAngles().y;
            const verticalDirection = Math.sin(rotation) * delta.z();
            const horizontalDirection = Math.cos(rotation) * delta.z();

            let rotatedDelta = new VectorModel(verticalDirection, 0, horizontalDirection);

            player.setPosition(player.getPosition().add(player.getCollisionHandler().getAdjustedDelta(rotatedDelta)));
        }

        const enemy = this.fieldMap.getEnemies()[0];
        if (enemy.getSensor().testIsWithinRange(player)) {
            enemy.setMotionStrategy(new AttackingMotionStrategy(enemy, player));
        }
        const enemyDelta = enemy.getMotionStrategy().getNextPosition(elapsedTime);

        const adjustedDelta = enemy.getCollisionHandler().getAdjustedDelta(enemyDelta);
        if (adjustedDelta) {
            enemy.setPosition(enemy.getPosition().add(adjustedDelta));
        }

        player.getMotionStrategy().rotate(elapsedTime);

        this.scene.render();
    }
}