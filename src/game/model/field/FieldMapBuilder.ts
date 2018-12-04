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

    public build() {
        return this;
    }
}
