import { FieldMap } from './FieldMap';
import { MeshModel } from '../core/MeshModel';
import { Enemy } from '../creature/Enemy';
import { Player } from '../creature/Player';
import { MotionStrategy } from '../motion/path_finding/MotionStrategy';
import { Creature } from '../creature/Creature';
import { CollisionHandler } from '../motion/CollisionHandler';
import { EyeSensor } from '../sensor/EyeSensor';

export class FieldMapBuilder extends FieldMap {

    public addObstacles(obstacles: MeshModel[]) {
        this.obstacles = obstacles;
    }

    public addEnemies(enemies: Enemy[]) {
        this.enemies = enemies;
    }

    public addPlayer(player: Player) {
        this.player = player;
    }

    public addPathFindingStrategy(strategy: MotionStrategy, strategyUser: Creature) {
        this.pathFindingStrategyMap = this.pathFindingStrategyMap.set(strategyUser, strategy);
    }

    public addCollisionHandler(collisionHandler: CollisionHandler, collisionUser: Creature) {
        this.collisionHandlerMap = this.collisionHandlerMap.set(collisionUser, collisionHandler);
    }

    public addVisibilityDetector(visibilityDetector: EyeSensor) {
        this.visibilityDetector = visibilityDetector;
    }

    public build() {
        return this;
    }
}