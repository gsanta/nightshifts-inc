import { Mesh, Vector3 } from 'babylonjs';
import { Movable } from './Creature';

export enum Direction {
    FORWARD, BACKWARD, LEFT, RIGHT
}

export class MotionHandler {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Movable;
    private directions: Direction[] = [];
    private rotationDirection: Direction = null;

    private interval = 1000;
    private distanceByInterval = 10;

    constructor(player: Movable) {
        this.player = player;
    }

    public getPosition() {
        return this.player.getPosition();
    }

    public setPosition(position: Vector3) {
        this.player.setPotision(position);
    }

    public shouldMove() {
        return this.directions.length > 0;
    }

    public getMoveDelta(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;
        const position = this.player.getPosition();
        const translation = this.convertToVectorDirection().scale(distance);
        return translation;
    }

    public translate(v: Vector3) {
        this.player.translate(v, 1);
    }

    public move(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;
        this.player.translate(this.convertToVectorDirection(), distance);
    }

    public reverseMove(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;
        const directionVector = this.convertToVectorDirection().multiply(new Vector3(-1, -1, -1));
        this.player.translate(directionVector, distance);
    }

    public rotate(elapsedTime: number) {
        let distance = elapsedTime / this.interval;
        if (this.rotationDirection === Direction.RIGHT) {
            this.player.rotate(Math.PI * 2 * distance);
        } else if (this.rotationDirection === Direction.LEFT) {
            this.player.rotate(-1 * Math.PI * 2 * distance);
        }
    }

    public addDirection(direction: Direction) {
        this.directions.push(direction);
    }

    public hasDirection(direction: Direction) {
        return this.directions.indexOf(direction) !== -1;
    }

    public removeDirection(direction: Direction) {
        this.directions = this.directions.filter((dir) => dir !== direction);
    }

    public setRotationDirection(direction: Direction) {
        this.rotationDirection = direction;
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