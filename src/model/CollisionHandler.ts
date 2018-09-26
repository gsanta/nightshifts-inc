import { Mesh, Vector3 } from 'babylonjs';
import { Direction } from './MotionHandler';

export class CollisionHandler {
    private player: Mesh;

    constructor(player: Mesh) {
        this.player = player;
    }

    public getAdjustedPositionDelta(positionDelta: Vector3, obstacle: Mesh) {
        if (this.doesCollideVertically(positionDelta, obstacle)) {
            positionDelta.z = 0;
            return positionDelta;
        }
    }

    private doesCollideVertically(positionDelta: Vector3, obstacle: Mesh) {
        const direction = this.getVerticalDirection(positionDelta);
        const offsettedPlayerPos = this.player.getAbsolutePosition().z + positionDelta.z;

        if (direction === Direction.FORWARD) {
            const obstaclePos = obstacle.getAbsolutePosition().z;
            if (offsettedPlayerPos > obstaclePos) {
                return true;
            }
        } else {
            const obstacleHeight = obstacle.getBoundingInfo().boundingBox.extendSize.scale(2).z;
            const obstaclePos = obstacle.getAbsolutePosition().z + obstacleHeight;
            if (offsettedPlayerPos < obstaclePos) {
                return true;
            }
        }
        this.player.getAbsolutePosition().z
        return positionDelta.z;
    }

    private getVerticalDirection(positionDelta: Vector3) {
        if (positionDelta.z > 0) {
            return Direction.FORWARD;
        } else {
            return Direction.BACKWARD;
        }
    }

    private doesCollideHorizontally(positionDelta: Vector3) {
        return positionDelta.z;
    }
}