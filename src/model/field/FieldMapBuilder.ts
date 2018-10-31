import { FieldMap } from './FieldMap';
import { MeshModel } from '../core/MeshModel';
import { Enemy } from '../creature/type/Enemy';
import { MotionStrategy } from '../creature/motion/MotionStrategy';
import { Creature } from '../creature/type/Creature';
import { Player } from '../creature/type/Player';
import { EyeSensor } from '../creature/sensor/EyeSensor';
import { CollisionDetector } from '../creature/collision/CollisionDetector';

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

    public addCollisionHandler(collisionHandler: CollisionDetector, collisionUser: Creature) {
        this.collisionHandlerMap = this.collisionHandlerMap.set(collisionUser, collisionHandler);
    }

    public addVisibilityDetector(visibilityDetector: EyeSensor) {
        this.visibilityDetector = visibilityDetector;
    }

    public build() {
        return this;
    }
}