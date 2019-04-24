import { VectorModel } from '../../model/core/VectorModel';

export interface MotionStrategy {
    calcNextPositionDelta(elapsedTime: number): VectorModel;
    calcNextRotationDelta(elapsedTime: number): number;
    isIdle(): boolean;
}
