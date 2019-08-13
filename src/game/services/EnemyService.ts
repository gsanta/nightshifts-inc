import { World } from '../model/game_objects/World';
import { GameObject } from '../model/game_objects/GameObject';
import { VectorModel } from '../model/core/VectorModel';

type enemyMotionState = 'idle' | 'attacking' | 'returning';


export class EnemyService {
    private world: World;
    private enemyMotionStates: Map<GameObject, enemyMotionState>;

    constructor(world: World) {
        this.world = world;
    }

    public updateEnemies() {
        const activeRoom = this.world.getWorldItemsByType('room').find(room => room.isActive);

        if (activeRoom) {
            const enemies = activeRoom.children
                .filter(child => child.type === 'enemy')
                .forEach(enemy => {


                    if (this.enemyMotionStates.get(enemy) === 'idle') {

                    }
                });


        }
    }

    private strike(enemy: GameObject) {
        if (enemy.intersectsWorldItem(this.world.player)) {
            this.world.player.health = this.world.player.health - 30;
        }
    }

    // private calcNextPositionDelta(world: World): void {
    //     const target = world.player;
    //     let distance = 0.5;
    //     const destination = target.getCenterPosition();
    //     const center = this.enemy.getBoundingBox().getBoundingCenter();
    //     const currentPosition = new VectorModel(center.x, 0, center.y);

    //     const direction = destination.subtract(currentPosition).normalize();

    //     const delta = direction.scale(distance);

    //     const adjustedDelta = this.collisionDetector.getAdjustedDelta(delta);

    //     this.enemy.setPosition(currentPosition.add(adjustedDelta));

    // }

    // private calcNextPositionForReturning(world: World) {
    //     const target = world.player;
    //     let distance = 0.5;
    //     const destination = this.initialPosition;
    //     const center = this.enemy.getBoundingBox().getBoundingCenter();
    //     const currentPosition = new VectorModel(center.x, 0, center.y);

    //     const direction = destination.subtract(currentPosition).normalize();

    //     const delta = direction.scale(distance);

    //     const adjustedDelta = this.collisionDetector.getAdjustedDelta(delta);

    //     this.enemy.setPosition(currentPosition.add(adjustedDelta));
    // }
}