import { Scene, Engine } from 'babylonjs';
import { AttackingMotionStrategy } from './model/creature/motion/AttackingMotionStrategy';
import { CollisionDetector } from './model/creature/collision/CollisionDetector';
import { WorldMap } from './game_map_creator/WorldMap';
import { createLevel } from './levels/createLevel';
import { GameObject } from 'game-worldmap-generator';


export class GameEngine {
    private scene: Scene;
    private gameMap: WorldMap;
    private previousTime: number;
    private engine: Engine;

    constructor(canvas: HTMLCanvasElement) {
        this.run = this.run.bind(this);
        const engine = new BABYLON.Engine(canvas);
        this.engine = engine;
        engine.enableOfflineSupport = false;

        this.scene = new BABYLON.Scene(engine);
        this.scene.collisionsEnabled = true;
    }

    public runGame(gameObjects: GameObject[]) {
        this.gameMap = createLevel(this.scene, gameObjects);
        this.engine.runRenderLoop(this.run);
    }

    private run() {
        if (!this.gameMap.player.getBody()) {
            return;
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
        const player = this.gameMap.player;

        this.gameMap.enemies.forEach(enemy => {
            const isVisible = player.getSensor().testIsWithinRange(this.gameMap.enemies[0]);
            if (isVisible) {
                enemy.setIsVisible(true);
            } else {
                enemy.setIsVisible(false);
            }
        });
    }

    private movePlayer(elapsedTime: number) {
        const player = this.gameMap.player;

        if (!player.getMotionStrategy().isIdle()) {
            const delta = player.getMotionStrategy().calcNextPositionDelta(elapsedTime);
            player.setPosition(player.getPosition().add(delta));
        }

        const rotationDelta = player.getMotionStrategy().calcNextRotationDelta(elapsedTime);
        player.setRotation(rotationDelta);
    }

    private moveEnemies(elapsedTime: number) {
        this.gameMap.enemies.forEach(enemy => {
            const enemyDelta = enemy.getMotionStrategy().calcNextPositionDelta(elapsedTime);

            if (enemyDelta) {
                enemy.setPosition(enemy.getPosition().add(enemyDelta));
            }
        });
    }

    private attackPlayerIfWithinSensorRange() {
        const player = this.gameMap.player;

        this.gameMap.enemies.forEach(enemy => {
            if (enemy.getSensor().testIsWithinRange(player)) {
                const collisionDetector = new CollisionDetector(enemy, this.scene);
                enemy.setMotionStrategy(new AttackingMotionStrategy(enemy, player, collisionDetector));
            }
        });
    }
}
