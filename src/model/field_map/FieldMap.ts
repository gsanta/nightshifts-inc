import { MeshModel } from '../core/MeshModel';
import { Enemy } from '../creature/Enemy';
import { Player } from '../creature/Player';
import { Creature } from '../creature/Creature';
import { PathFindingStrategy } from '../motion/path_finding/PathFindingStrategy';
import {Map} from 'immutable';
import { CollisionHandler } from '../motion/CollisionHandler';

export class FieldMap {
    protected obstacles: MeshModel[];
    protected enemies: Enemy[];
    protected player: Player;
    protected pathFindingStrategyMap: Map<Creature, PathFindingStrategy> = Map();
    protected collisionHandlerMap: Map<Creature, CollisionHandler> = Map();

    public getObstacles(): MeshModel[] {
        return this.obstacles;
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getAllMeshes() {
        return [...this.obstacles, ...this.enemies, this.player];
    }
}