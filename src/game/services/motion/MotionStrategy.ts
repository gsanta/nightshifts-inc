import { Vector3 } from 'babylonjs';

export interface MotionStrategy {
    calcNextPositionDelta(elapsedTime: number): Vector3;
    calcNextRotationDelta(elapsedTime: number): number;
    isIdle(): boolean;
}
