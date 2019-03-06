import { FieldMap } from './FieldMap';
import { WorldItem } from '../../world_items/WorldItem';
import { Enemy } from '../creature/type/Enemy';
import { MotionStrategy } from '../creature/motion/MotionStrategy';
import { Creature } from '../creature/type/Creature';
import { Player } from '../creature/type/Player';
import { EyeSensor } from '../creature/sensor/EyeSensor';
import { CollisionDetector } from '../creature/collision/CollisionDetector';

export class FieldMapBuilder extends FieldMap {

    public addObstacles(obstacles: WorldItem[]) {
        this.obstacles = obstacles;
    }

    public addEnemies(enemies: Enemy[]) {
        this.enemies = enemies;
    }

    public addPlayer(player: Player) {
        this.player = player;
    }

    public build() {
        return this;
    }
}
