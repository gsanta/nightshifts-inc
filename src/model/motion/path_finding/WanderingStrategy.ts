import { MotionStrategy } from "./MotionStrategy";
import { VectorModel } from '../../core/VectorModel';
import { SceneModel } from '../../core/SceneModel';
import { Creature } from '../../creature/Creature';
import { Vector3 } from 'babylonjs';
import { MeshModel } from "../../core/MeshModel";

export class AutomaticPathFindingStartegy implements MotionStrategy {
    private speed = 100;
    private sceneModel: SceneModel;
    private creature: Creature;
    private obstacles: MeshModel[]
    private currentDestination: VectorModel = null;
    private previousSteps: VectorModel[] = [];

    constructor(creature: Creature, sceneModel: SceneModel, obstacles: MeshModel[]) {
        this.sceneModel = sceneModel;
        this.creature = creature;
        this.obstacles = obstacles;
        this.currentDestination = this.chooseNextDestination();
    }

    public getNextPosition(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;

        const direction = this.currentDestination.subtract(this.creature.getPosition()).normalize();

        this.savePreviousPosition(this.creature.getPosition());

        if (this.isDestinationReached() || this.noProgressHappening()) {
            this.currentDestination = this.chooseNextDestination();
        }
        return direction.scale(distance);
    }

    public isIdle(): boolean {
        throw new Error("Method not implemented.");
    }

    public rotate(elapsedTime: number) {
        throw new Error("Method not implemented.");
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
        const distanceToDestination = this.currentDestination.subtract(this.creature.getPosition());
        return distanceToDestination.length() < 1;
    }
}