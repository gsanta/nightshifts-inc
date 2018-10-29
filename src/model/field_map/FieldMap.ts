import { MeshModel } from '../core/MeshModel';
import { Enemy } from '../creature/Enemy';
import { Player } from '../creature/Player';
import { Creature } from '../creature/Creature';
import { PathFindingStrategy } from '../motion/path_finding/PathFindingStrategy';
import {Map} from 'immutable';
import { CollisionHandler } from '../motion/CollisionHandler';
import { EnemyVisibilityDetector } from '../sensor/EnemyVisibilityDetector';

export class FieldMap {
    protected obstacles: MeshModel[];
    protected enemies: Enemy[];
    protected player: Player;
    protected pathFindingStrategyMap: Map<Creature, PathFindingStrategy> = Map();
    protected collisionHandlerMap: Map<Creature, CollisionHandler> = Map();
    protected visibilityDetector: EnemyVisibilityDetector;

    public getObstacles(): MeshModel[] {
        return this.obstacles;
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getPathFindingStrategy(creature: Creature): PathFindingStrategy {
        return this.pathFindingStrategyMap.get(creature);
    }

    public getCollisionHandler(creature: Creature): CollisionHandler {
        return this.collisionHandlerMap.get(creature);
    }

    public getVisibilityDetector(): EnemyVisibilityDetector {
        return this.visibilityDetector;
    }

    public getAllMeshes() {
        return [...this.obstacles, ...this.enemies, this.player];
    }
}