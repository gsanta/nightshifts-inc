import { Mesh, Vector3 } from 'babylonjs';
import { Movement } from './MotionHandler';

export enum Direction {
    NORTH,
    SOUTH,
    WEST,
    EAST
}

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

        return positionDelta;
    }

    private doesCollideVertically(positionDelta: Vector3, obstacle: Mesh) {
        const direction = this.getVerticalDirection(positionDelta);
        let playerPos = this.player.getAbsolutePosition().z + positionDelta.z;

        if (direction === Movement.FORWARD) {
            const obstaclePos = obstacle.getAbsolutePosition().z;
            if (playerPos < obstaclePos) {
                return true;
            }
        } else {
            if (obstacle.getBoundingInfo().boundingBox.extendSize) {
                if (this.getObstacleOrientation(obstacle) === Direction.NORTH) {
                    if (this.getBottom(obstacle) < this.getTop(this.player)) {
                        return true;
                    }
                } else {
                    if (this.getTop(obstacle) > this.getBottom(this.player)) {
                        return true;
                    }
                    return false;
                }

            }
        }
        return false;
    }

    private getVerticalDirection(positionDelta: Vector3) {
        if (positionDelta.z > 0) {
            return Movement.FORWARD;
        } else {
            return Movement.BACKWARD;
        }
    }

    private getObstacleOrientation(obstacle: Mesh): Direction {
        let obstacleTop = this.getTop(obstacle);
        let playerTop = this.getTop(this.player);
        if (playerTop < obstacleTop) {
            return Direction.NORTH;
        } else {
            return Direction.SOUTH;
        }
    }

    private getTop(obstacle: Mesh) {
        if (obstacle.getAbsolutePosition().z < 0) {
            return obstacle.getAbsolutePosition().z;
        } else {
            return obstacle.getAbsolutePosition().z + this.getHeight(obstacle);
        }
    }

    private getBottom(mesh: Mesh) {
        if (mesh.getAbsolutePosition().z < 0) {
            return mesh.getAbsolutePosition().z - this.getHeight(mesh);
        } else {
            return mesh.getAbsolutePosition().z;
        }
    }

    private getHeight(obstacle: Mesh) {
        return obstacle.getBoundingInfo().boundingBox.extendSize.scale(2).z;
    }

    private doesCollideHorizontally(positionDelta: Vector3) {
        return positionDelta.z;
    }
}