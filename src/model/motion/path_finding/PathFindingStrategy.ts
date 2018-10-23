import { VectorModel } from '../../core/VectorModel';

export interface PathFindingStrategy {
    getNextPosition(elapsedTime: number): VectorModel;
}