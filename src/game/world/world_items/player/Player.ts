import { Creature } from '../Creature';
import { Scene, Mesh, Light, Skeleton } from 'babylonjs';
import { MeshTemplate } from '../../../model/core/templates/MeshTemplate';
import { VectorModel } from '../../../model/core/VectorModel';
import { UserInputEventEmitter } from '../../../interactions/motion/UserInputEventEmitter';

export interface Interval {
    from: number;
    to: number;
}

export class CreatureAnimationMesh {
    private modelTemplate: MeshTemplate;
    private intervals: { idleInterval: Interval, walkingInterval: Interval};
    private scene: Scene;
    private skeleton: Skeleton;

    constructor(skeleton: Skeleton, intervals: { idleInterval: Interval, walkingInterval: Interval}, scene: Scene) {
        this.skeleton = skeleton;
        this.intervals = intervals;
        this.scene = scene;
    }

    public idle() {
        this.scene.beginAnimation(this.modelTemplate.getSkeletons()[0], this.intervals.idleInterval.from, this.intervals.idleInterval.to, true, 1.0);
    }

    public walk() {
        this.scene.beginAnimation(this.modelTemplate.getSkeletons()[0], this.intervals.walkingInterval.from, this.intervals.walkingInterval.to, true, 1.0);
    }
}


export class Player extends Creature {
    private light: Light;
    private scene: Scene;
    private keyboardHandler: UserInputEventEmitter;
    public name = 'player';
    private skeleton: Skeleton;

    constructor(mesh: Mesh, skeleton: Skeleton, scene: Scene, light: Light, keyboardHandler: UserInputEventEmitter) {
        super(mesh, 'player');

        this.skeleton = skeleton;

        this.light = light;
        this.scene = scene;
        this.keyboardHandler = keyboardHandler;
        this.subscribeToUserInput();

        const quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0);
        this.mesh.rotationQuaternion = quaternion;
        this.light.parent = this.mesh;
    }

    public setRotation(distance: number) {
        this.mesh.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public playWalkingAnimation() {
        this.scene.stopAnimation(this.skeleton);
        this.scene.beginAnimation(this.skeleton, 0, 100, true, 1.0);
    }

    public playIdleAnimation() {
        this.scene.stopAnimation(this.skeleton);
    }

    public getBody(): Mesh {
        return this.mesh;
    }

    public getCenterPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public getRotationAngle(): number {
        return this.getRotation().y;
    }

    public getFieldOfViewAngle() {
        return Math.PI / 4;
    }

    public getRotation(): VectorModel {
        const vector = this.mesh.rotationQuaternion.toEulerAngles();
        return new VectorModel(vector.x, vector.y, vector.z);
    }

    private subscribeToUserInput() {
        this.keyboardHandler.onDoAction(() => this.actionStrategy.activateClosestMeshAction());
    }
}
