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
        if (!this.player.rotationQuaternion) {
            return positionDelta;
        }

        const rotation = this.player.rotationQuaternion.toEulerAngles().y;
        const horizontalDirection = Math.sin(rotation) * positionDelta.z;
        const verticalDirection = Math.cos(rotation) * positionDelta.z;

        const normalizedPositionDelta = new Vector3(horizontalDirection, 0, verticalDirection);
        console.log('distance: ' + positionDelta.z + ' vdistance: ' + verticalDirection + ' hdistance: ' + horizontalDirection)
        if (this.doesCollideVertically(normalizedPositionDelta, obstacle)) {
            normalizedPositionDelta.z = 0;
        }

        if (this.doesCollideHorizontally(normalizedPositionDelta, obstacle)) {
            normalizedPositionDelta.x = 0;
        }

        return normalizedPositionDelta;
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

    public doesCollideHorizontally(positionDelta: Vector3, obstacle: Mesh) {
        const direction = this.getHorizontalDirection(positionDelta);
        let playerPos = this.player.getAbsolutePosition().x + positionDelta.x;

        if (direction === Movement.RIGHT) {
            const obstaclePos = obstacle.getAbsolutePosition().x;
            if (playerPos < obstaclePos) {
                return true;
            }
        }

        return false;
    }

    private getHorizontalDirection(positionDelta: Vector3) {
        if (positionDelta.x > 0) {
            return Movement.RIGHT;
        } else {
            return Movement.LEFT;
        }
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

}