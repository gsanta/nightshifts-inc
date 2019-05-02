import { MotionStrategy } from './MotionStrategy';
import { VectorModel } from '../../model/core/VectorModel';
import { SceneModel } from '../../model/core/SceneModel';
import { Creature } from '../../world/world_items/Creature';
import { WorldItem } from '../../world/world_items/WorldItem';
import { CollisionDetector } from '../../actions/motion_actions/collision_detection/CollisionDetector';

export class WanderingMotionStrategy implements MotionStrategy {
    private speed = 100;
    private sceneModel: SceneModel;
    private creature: Creature;
    private obstacles: WorldItem[];
    private collisionDetector: CollisionDetector;
    private currentDestination: VectorModel = null;
    private previousSteps: VectorModel[] = [];

    constructor(creature: Creature, sceneModel: SceneModel, obstacles: WorldItem[], collisionDetector: CollisionDetector) {
        this.sceneModel = sceneModel;
        this.creature = creature;
        this.obstacles = obstacles;
        this.collisionDetector = collisionDetector;
        this.currentDestination = this.chooseNextDestination();
    }

    public calcNextPositionDelta(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;

        const direction = this.currentDestination.subtract(this.creature.getCenterPosition()).normalize();

        this.savePreviousPosition(this.creature.getCenterPosition());

        if (this.isDestinationReached() || this.noProgressHappening()) {
            this.currentDestination = this.chooseNextDestination();
        }

        const delta = direction.scale(distance);
        return this.collisionDetector.getAdjustedDelta(delta);
    }

    public isIdle(): boolean {
        throw new Error('Method not implemented.');
    }

    public calcNextRotationDelta(elapsedTime: number): number {
        throw new Error('Method not implemented.');
    }

    private chooseNextDestination() {
        const nextX = this.sceneModel.getMinX() + 5 + Math.random() * this.sceneModel.getWidth() - 10;
        const nextZ = this.sceneModel.getMinZ() + 5 + Math.random() * this.sceneModel.getDepth() - 10;
        const destination = new VectorModel(nextX, 0, nextZ);

        if (!this.isDestinationReachable(destination)) {
            return this.chooseNextDestination();
        }

        return destination;
    }

    private savePreviousPosition(prevPosition: VectorModel) {
        this.previousSteps.push(prevPosition);
        if (this.previousSteps.length > 10) {
            this.previousSteps.shift();
        }
    }

    private noProgressHappening() {
        if (this.previousSteps.length < 10) {
            return false;
        }

        if (this.previousSteps[0].subtract(this.previousSteps[9]).length() < 1) {
            return true;
        }

        return false;
    }

    private isDestinationReachable(destination: VectorModel) {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].intersectsPoint(destination)) {
                return false;
            }
        }
        return true;
    }

    private isDestinationReached() {
        const distanceToDestination = this.currentDestination.subtract(this.creature.getCenterPosition());
        return distanceToDestination.length() < 1;
    }
}
