import { Mesh, Vector3 } from 'babylonjs';

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
        if (this.doesCollideVertically(normalizedPositionDelta, obstacle)) {
            normalizedPositionDelta.z = 0;
        }

        if (this.doesCollideHorizontally(normalizedPositionDelta, obstacle)) {
            normalizedPositionDelta.x = 0;
        }

        return normalizedPositionDelta;
    }

    private doesCollideVertically(positionDelta: Vector3, obstacle: Mesh) {
        const playerTop = this.getTop(this.player) + positionDelta.z;
        const playerBottom = this.getBottom(this.player) + positionDelta.z;

        const obstacleTop = this.getTop(obstacle);
        const obstacleBottom = this.getBottom(obstacle);

        if (obstacleTop > playerTop && obstacleBottom < playerTop ||
            obstacleTop > playerBottom && obstacleBottom < playerBottom) {
            return true;
        }

        return false;
    }

    public doesCollideHorizontally(positionDelta: Vector3, obstacle: Mesh) {


        const playerLeft = this.getLeft(this.player) + positionDelta.x;
        const playerRight = this.getRight(this.player) + positionDelta.x;

        const obstacleLeft = this.getLeft(obstacle);
        const obstacleRight = this.getRight(obstacle);

        if (obstacleLeft < playerLeft && obstacleRight > playerLeft ||
            obstacleLeft < playerRight && obstacleRight > playerRight) {
            return true;
        }

        return false;
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

    private getLeft(mesh: Mesh) {
        if (mesh.getAbsolutePosition().x < 0) {
            return mesh.getAbsolutePosition().x - this.getWidth(mesh);
        } else {
            return mesh.getAbsolutePosition().x;
        }
    }

    private getRight(mesh: Mesh) {
        if (mesh.getAbsolutePosition().x < 0) {
            return mesh.getAbsolutePosition().x;
        } else {
            return mesh.getAbsolutePosition().x + this.getWidth(mesh);
        }
    }

    private getHeight(obstacle: Mesh) {
        return obstacle.getBoundingInfo().boundingBox.extendSize.scale(2).z;
    }

    private getWidth(obstacle: Mesh) {
        return obstacle.getBoundingInfo().boundingBox.extendSize.scale(2).x;
    }
}