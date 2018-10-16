import { VectorModel } from '../../core/VectorModel';

export interface PathFindingStrategy {
    getNextStep(elapsedTime: number): VectorModel;
}