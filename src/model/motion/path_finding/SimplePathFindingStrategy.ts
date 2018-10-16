import { PathFindingStrategy } from "./PathFindingStrategy";
import { VectorModel } from '../../core/VectorModel';

export class SimplePathFindingStartegy implements PathFindingStrategy {
    private speed = 100;

    public getNextStep(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;

        return new VectorModel(0, 0, 1).scale(distance);
    }
}