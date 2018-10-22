import { AnimatedModel } from '../io/AnimatedModel';
import { Scene } from 'babylonjs';

export interface Interval {
    from: number;
    to: number;
}

export class CreatureAnimationMesh {
    private animatedModel: AnimatedModel;
    private intervals: { idleInterval: Interval, walkingInterval: Interval};
    private scene: Scene;

    constructor(animatedModel: AnimatedModel, intervals: { idleInterval: Interval, walkingInterval: Interval}, scene: Scene) {
        this.animatedModel = animatedModel;
        this.intervals = intervals;
        this.scene = scene;
    }

    public idle() {
        this.scene.beginAnimation(this.animatedModel.skeletons[0], this.intervals.idleInterval.from, this.intervals.idleInterval.to, true, 1.0);
    }

    public walk() {
        this.scene.beginAnimation(this.animatedModel.skeletons[0], this.intervals.walkingInterval.from, this.intervals.walkingInterval.to, true, 1.0);
    }
}