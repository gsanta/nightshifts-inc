import { VectorModel } from '../../core/VectorModel';

export interface MotionStrategy {
    getNextPosition(elapsedTime: number): VectorModel;
    isIdle(): boolean;
    rotate(elapsedTime: number);
}