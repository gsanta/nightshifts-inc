import { Mesh, Vector3 } from 'babylonjs';
import { Movable } from './Creature';

export enum Direction {
    FORWARD, BACKWARD, LEFT, RIGHT
}

export class MotionHandler {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Movable;
    private speed: number;
    private directions: Direction[] = [];
    private vectorDirection: Vector3 = new Vector3(0, 0, 0);

    constructor(player: Movable, speed: number) {
        this.player = player;
        this.speed = speed;
    }

    public move() {
        this.player.translate(this.convertToVectorDirection(), 0.1);
    }

    public reverseMove() {
        const directionVector = this.convertToVectorDirection().multiply(new Vector3(-1, -1, -1));
        this.player.translate(directionVector, 0.1);
    }

    public addDirection(direction: Direction) {
        this.directions.push(direction);
    }

    public removeDirection(direction: Direction) {
        this.directions = this.directions.filter((dir) => dir !== direction);
    }

    private convertToVectorDirection() {
        const unitVectors = this.directions.map(direction => MotionHandler.directionToUnitVector(direction));
        return this.createCombinedDirectionVectorFromBaseVectors(unitVectors);
    }

    private createCombinedDirectionVectorFromBaseVectors(vectors: Vector3[]) {
        return vectors.reduce((accum: Vector3, next: Vector3) => accum.add(next), new Vector3(0, 0, 0));
    }

    private static directionToUnitVector(direction: Direction) {
        switch(direction) {
            case Direction.FORWARD:
                return new Vector3(0, 0, 1);
            case Direction.BACKWARD:
                return new Vector3(0, 0, -1);
            case Direction.LEFT:
                return new Vector3(-1, 0, 0);
            case Direction.RIGHT:
                return new Vector3(1, 0, 0);
        }
    }
}

// this.gameObject.meshObject.translate(BABYLON.Vector3.Up(), this.movementSpeed * Tools.getDeltaTime());
