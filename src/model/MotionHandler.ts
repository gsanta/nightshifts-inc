import { Mesh, Vector3 } from 'babylonjs';
import { Movable } from './Creature';

export enum Movement {
    FORWARD, BACKWARD, LEFT, RIGHT
}

export class MotionHandler {
    public static readonly DEFAULT_SPEED: number = 2;
    private player: Movable;
    private directions: Movement[] = [];
    private rotationDirection: Movement = null;

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

        let vec: Vector3;
        if (this.directions.length > 0) {
            if (this.directions[0] === Movement.FORWARD) {
                vec = new Vector3(0, 0, 1);
            } else if (this.directions[0] === Movement.BACKWARD) {
                vec = new Vector3(0, 0, -1);
            }
        }

        const translation = vec.scale(distance);
        return translation;
    }

    public translate(v: Vector3) {
        this.player.translate(v, 1);
    }

    public move(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;

        let vec: Vector3;
        if (this.directions.length > 0) {
            if (this.directions[0] === Movement.FORWARD) {
                vec = new Vector3(0, 0, 1);
            } else if (this.directions[0] === Movement.BACKWARD) {
                vec = new Vector3(0, 0, -1);
            }
        }

        this.player.translate(vec, distance);
    }

    public reverseMove(elapsedTime: number) {
        let distance = elapsedTime / this.interval * this.distanceByInterval;
        const directionVector = this.convertToVectorDirection().multiply(new Vector3(-1, -1, -1));
        this.player.translate(directionVector, distance);
    }

    public rotate(elapsedTime: number) {
        let distance = elapsedTime / this.interval;
        if (this.rotationDirection === Movement.RIGHT) {
            this.player.rotate(Math.PI * 2 * distance);
        } else if (this.rotationDirection === Movement.LEFT) {
            this.player.rotate(-1 * Math.PI * 2 * distance);
        }
    }

    public isIdle() {
        return this.directions.length === 0;
    }

    public addDirection(direction: Movement) {
        this.directions.push(direction);
    }

    public hasDirection(direction: Movement) {
        return this.directions.indexOf(direction) !== -1;
    }

    public removeDirection(direction: Movement) {
        this.directions = this.directions.filter((dir) => dir !== direction);
    }

    public setRotationDirection(direction: Movement) {
        this.rotationDirection = direction;
    }

    private convertToVectorDirection() {
        const unitVectors = this.directions.map(direction => MotionHandler.directionToUnitVector(direction));
        return this.createCombinedDirectionVectorFromBaseVectors(unitVectors);
    }

    private createCombinedDirectionVectorFromBaseVectors(vectors: Vector3[]) {
        return vectors.reduce((accum: Vector3, next: Vector3) => accum.add(next), new Vector3(0, 0, 0));
    }

    private static directionToUni
    private static directionToUnitVector(direction: Movement) {
        switch(direction) {
            case Movement.FORWARD:
                return new Vector3(0, 0, 1);
            case Movement.BACKWARD:
                return new Vector3(0, 0, -1);
            case Movement.LEFT:
                return new Vector3(-1, 0, 0);
            case Movement.RIGHT:
                return new Vector3(1, 0, 0);
        }
    }
}