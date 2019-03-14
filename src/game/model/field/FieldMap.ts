import { WorldItem } from '../../world_items/WorldItem';
import { Enemy } from '../creature/type/Enemy';
import { Creature } from '../creature/type/Creature';
import { MotionStrategy } from '../creature/motion/MotionStrategy';
import {Map} from 'immutable';
import { EyeSensor } from '../creature/sensor/EyeSensor';
import { Player } from '../creature/type/Player';
import { CollisionDetector } from '../creature/collision/CollisionDetector';

export class FieldMap {
    protected obstacles: WorldItem[];
    protected enemies: Enemy[];
    protected player: Player;

    public getObstacles(): WorldItem[] {
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
