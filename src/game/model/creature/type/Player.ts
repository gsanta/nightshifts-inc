import { Creature } from './Creature';
import { Scene, Vector3, Mesh, Light, Skeleton } from 'babylonjs';
import { ModelFileBasedTemplateCreator } from '../../core/templates/creators/ModelFileBasedTemplateCreator';
import { MeshTemplate } from '../../core/templates/MeshTemplate';
import { VectorModel } from '../../core/VectorModel';
import { UserInputEventEmitter } from '../motion/UserInputEventEmitter';

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
    private creatureAnimationMesh: CreatureAnimationMesh;
    private modelTemplate: MeshTemplate;
    private keyboardHandler: UserInputEventEmitter;
    public name = 'player';
    private skeleton: Skeleton;

    constructor(mesh: Mesh, skeleton: Skeleton, scene: Scene, light: Light, keyboardHandler: UserInputEventEmitter) {
        super(mesh);

        this.skeleton = skeleton;

        // this.modelLoader = new ModelFileBasedTemplateCreator('../models/dude/', scene);
        this.light = light;
        this.scene = scene;
        this.keyboardHandler = keyboardHandler;
        this.subscribeToUserInput();
        // const that: any = this;

        this.creatureAnimationMesh = new CreatureAnimationMesh(
            this.skeleton,
            {
                idleInterval: null,
                walkingInterval: {
                    from: 0,
                    to: 100
                }
            },
            this.scene
        );

        const quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0);
        this.mesh.rotationQuaternion = quaternion;
        this.light.parent = this.mesh;
        // this.mesh.setAbsolutePosition(new Vector3(translate.x(), translate.y(), translate.z()));

        // this.modelLoader.load('Dude.babylon', null, {
        //         singleton: true
        //     })
        //     .then((modelTemplate: MeshTemplate) => {
        //         this.modelTemplate = modelTemplate;
        //         that.creatureAnimationMesh = new CreatureAnimationMesh(
        //             modelTemplate,
        //             {
        //                 idleInterval: null,
        //                 walkingInterval: {
        //                     from: 0,
        //                     to: 100
        //                 }
        //             },
        //             that.scene
        //         );

        //         const meshes = modelTemplate.createMeshes();
        //         meshes.forEach(mesh => mesh.isPickable = false);

        //         meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        //         // meshes[0].rotation.y = Math.PI * 3 / 2;
        //         that.mesh = meshes[0];
        //         that.mesh.checkCollisions = true;
        //         const quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0);
        //         that.mesh.rotationQuaternion = quaternion;
        //         that.light.parent = that.mesh;
        //         this.mesh.setAbsolutePosition(new Vector3(translate.x(), translate.y(), translate.z()));
        //     });
    }

    public setRotation(distance: number) {
        this.mesh.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public playWalkingAnimation() {
        const skeletons = this.modelTemplate.getSkeletons();
        this.scene.stopAnimation(skeletons[0]);
        this.scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
    }

    public playIdleAnimation() {
        const skeletons = this.modelTemplate.getSkeletons();
        this.scene.stopAnimation(skeletons[0]);
    }

    public getBody(): Mesh {
        return this.mesh;
    }

    public getRotationAngle(): number {
        return this.getRotation().y;
    }

    public getFieldOfViewAngle() {
        return Math.PI / 4;
    }

    public getRotation(): Vector3 {
        return this.mesh.rotationQuaternion.toEulerAngles();
    }

    public getCenterPosition() {
        return this.getPosition();
    }

    private subscribeToUserInput() {
        this.keyboardHandler.onDoAction(() => this.actionStrategy.activateClosestMeshAction());
    }
}
