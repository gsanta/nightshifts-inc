import { PathFindingStrategy } from "./PathFindingStrategy";
import { VectorModel } from '../../core/VectorModel';

export class AutomaticPathFindingStartegy implements PathFindingStrategy {
    private speed = 100;

    public getNextPosition(elapsedTime: number): VectorModel {
        let distance = elapsedTime / this.speed;

        return new VectorModel(0, 0, 1).scale(distance);
    }
}