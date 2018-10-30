import { MeshModel } from '../core/MeshModel';
import { Enemy } from '../creature/Enemy';
import { Player } from '../creature/Player';
import { Creature } from '../creature/Creature';
import { MotionStrategy } from '../motion/path_finding/MotionStrategy';
import {Map} from 'immutable';
import { CollisionHandler } from '../motion/CollisionHandler';
import { EyeSensor } from '../sensor/EyeSensor';

export class FieldMap {
    protected obstacles: MeshModel[];
    protected enemies: Enemy[];
    protected player: Player;
    protected pathFindingStrategyMap: Map<Creature, MotionStrategy> = Map();
    protected collisionHandlerMap: Map<Creature, CollisionHandler> = Map();
    protected visibilityDetector: EyeSensor;

    public getObstacles(): MeshModel[] {
        return this.obstacles;
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getPathFindingStrategy(creature: Creature): MotionStrategy {
        return this.pathFindingStrategyMap.get(creature);
    }

    public getCollisionHandler(creature: Creature): CollisionHandler {
        return this.collisionHandlerMap.get(creature);
    }

    public getVisibilityDetector(): EyeSensor {
        return this.visibilityDetector;
    }

    public getAllMeshes() {
        return [...this.obstacles, ...this.enemies, this.player];
    }
}