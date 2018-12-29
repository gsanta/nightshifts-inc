import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { MotionStrategy } from '../motion/MotionStrategy';
import { Sensor } from '../sensor/Sensor';
import { CollisionDetector } from '../collision/CollisionDetector';
import { MeshModel } from '../../core/MeshModel';
import { ActionStrategy } from '../action/ActionStrategy';

export abstract class Creature extends MeshModel {
    protected sensor: Sensor;
    protected motionStrategy: MotionStrategy;
    protected collisionDetector: CollisionDetector;
    protected actionStrategy: ActionStrategy;

    constructor(mesh: Mesh) {
        super(mesh);
    }

    public getBody(): Mesh {
        return this.mesh;
    }

    public setRotation(distance: number) {
        this.mesh.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x(), position.y(), position.z());
    }

    public getSensor(): Sensor {
        return this.sensor;
    }

    public setSensor(sensor: Sensor) {
        this.sensor = sensor;
    }

    public getMotionStrategy(): MotionStrategy {
        return this.motionStrategy;
    }

    public setMotionStrategy(motionStrategy: MotionStrategy) {
        this.motionStrategy = motionStrategy;
    }

    public getActionStrategy(): ActionStrategy {
        return this.actionStrategy;
    }

    public setActionStrategy(actionStrategy: ActionStrategy) {
        this.actionStrategy = actionStrategy;
    }

    public abstract playWalkingAnimation();
    public abstract playIdleAnimation();
    public setIsVisible(isVisible: boolean) {}
}
