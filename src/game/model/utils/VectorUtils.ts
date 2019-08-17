import { Point } from '@nightshifts.inc/geometry';
import { Vector3, Mesh } from 'babylonjs';

export class VectorUtils {
    static globalToLocalVector(vector: Vector3, mesh: Mesh): Vector3 {
        return Vector3.TransformCoordinates(vector, mesh.getWorldMatrix());
    }

    static pointToVector(point: Point): Vector3 {
        return new Vector3(point.x, 0, point.y);
    }

    static vectorToPoint(vector: Vector3): Point {
        return new Point(vector.x, vector.z);
    }
}
