import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { MotionStrategy } from '../motion/MotionStrategy';
import { Sensor } from '../sensor/Sensor';
import { CollisionDetector } from '../collision/CollisionDetector';

export abstract class Creature {
    protected body: Mesh;
    protected sensor: Sensor;
    protected motionStrategy: MotionStrategy;
    protected collisionDetector: CollisionDetector;

    public getBody(): Mesh {
        return this.body;
    }

    public setRotation(distance: number) {
        this.body.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public getPosition(): VectorModel {
        const position = this.body.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public setPosition(position: VectorModel) {
        this.body.position = new Vector3(position.x(), position.y(), position.z());
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

    public abstract playWalkingAnimation();
    public abstract playIdleAnimation();
    public setIsVisible(isVisible: boolean) {}
}
