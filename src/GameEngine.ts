import { Scene, Engine } from 'babylonjs';
import { FieldMap } from './model/field/FieldMap';
import { createLevel1FieldMap } from './levels/createLevel1FieldMap';
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

        this.movePlayer(elapsedTime);
        this.moveEnemies(elapsedTime);
        this.testAndSetEnemyVisibility();
        this.attackPlayerIfWithinSensorRange();

        this.scene.render();
    }

    private testAndSetEnemyVisibility() {
        const player = this.fieldMap.getPlayer();

        this.fieldMap.getEnemies().forEach(enemy => {
            const isVisible = player.getSensor().testIsWithinRange(this.fieldMap.getEnemies()[0]);
            if (isVisible) {
                enemy.setIsVisible(true);
            } else {
                enemy.setIsVisible(false);
            }
        });
    }

    private movePlayer(elapsedTime: number) {
        const player = this.fieldMap.getPlayer();

        if (!player.getMotionStrategy().isIdle()) {
            const delta = player.getMotionStrategy().getNextPosition(elapsedTime);
            const deltaWithCollision = player.getCollisionHandler().getAdjustedDelta(delta);
            player.setPosition(player.getPosition().add(deltaWithCollision));
        }

        player.getMotionStrategy().rotate(elapsedTime);
    }

    private moveEnemies(elapsedTime: number) {
        this.fieldMap.getEnemies().forEach(enemy => {
            const enemyDelta = enemy.getMotionStrategy().getNextPosition(elapsedTime);

            const adjustedDelta = enemy.getCollisionHandler().getAdjustedDelta(enemyDelta);
            if (adjustedDelta) {
                enemy.setPosition(enemy.getPosition().add(adjustedDelta));
            }
        });
    }

    private attackPlayerIfWithinSensorRange() {
        const player = this.fieldMap.getPlayer();

        this.fieldMap.getEnemies().forEach(enemy => {
            if (enemy.getSensor().testIsWithinRange(player)) {
                enemy.setMotionStrategy(new AttackingMotionStrategy(enemy, player));
            }
        });
    }
}