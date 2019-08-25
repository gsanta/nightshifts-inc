import { Point } from '@nightshifts.inc/geometry';
import { Vector3, Mesh } from 'babylonjs';

export class VectorUtils {
    static globalToLocalVector(vector: Vector3, mesh: Mesh): Vector3 {
        return Vector3.TransformCoordinates(vector, mesh.getWorldMatrix());
    }

    static pointToVector(point: Point, y = 0): Vector3 {
        return new Vector3(point.x, y, point.y);
    }

    static vectorToPoint(vector: Vector3): Point {
        return new Point(vector.x, vector.z);
    }

    /**
     * Converts a global direction to a normalized local one of the originMesh.
     */
    static localNormalDirection(globalDirection: Vector3, originMesh: Mesh) {
        let direction = this.globalToLocalVector(globalDirection, originMesh);
        direction = direction.subtract(originMesh.position);
        direction = Vector3.Normalize(direction);

        return direction;
    }
}
