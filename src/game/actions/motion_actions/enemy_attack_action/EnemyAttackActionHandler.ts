import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { Enemy } from '../../../world/world_items/enemy/Enemy';
import { Room } from '../../../world/world_items/room/Room';
import { CollisionDetector } from '../collision_detection/CollisionDetector';
import find from 'lodash/find';
import { VectorModel } from '../../../model/core/VectorModel';

export class EnemyAttackActionHandler implements ActionHandler {
    private enemy: Enemy;
    private activeRoom: Room;
    private collisionDetector: CollisionDetector;

    public handle(type: string, world: World, enemy: Enemy) {
        switch (type) {
            case GameActionType.ENEMY_CREATED:
                this.enemy = enemy;
                this.collisionDetector = new CollisionDetector(this.enemy, world.scene);
                break;

            case GameActionType.ENTER_ROOM:
                this.activeRoom = <Room> find(world.getWorldItemsByName('room'), (room: Room) => room.isActive);
                break;
            case GameActionType.NEXT_TICK:
                if (this.enemy && this.enemy.parent === this.activeRoom) {
                    this.calcNextPositionDelta(world);
                }
                break;
            default:
                break;
        }
    }

    private calcNextPositionDelta(world: World): void {
        const target = world.player;
        let distance = 0.5;
        const destination = target.getCenterPosition();
        const center = this.enemy.getBoundingPolygon().getBoundingCenter();
        const currentPosition = new VectorModel(center.x, 0, center.y);

        const direction = destination.subtract(currentPosition).normalize();

        const delta = direction.scale(distance);

        const adjustedDelta = this.collisionDetector.getAdjustedDelta(delta);

        this.enemy.setPosition(currentPosition.add(adjustedDelta));

    }
}
