import { Mesh, Vector3, Axis, Space } from '@babylonjs/core';
import { VectorModel } from '../../model/core/VectorModel';
import { SimpleWorldItem } from './SimpleWorldItem';

export abstract class Creature extends SimpleWorldItem<any> {
    constructor(mesh: Mesh, name: string) {
        super(mesh, name);
    }

    public getBody(): Mesh {
        return this.mesh;
    }

    public setRotation(distance: number) {
        this.mesh.rotate(Axis.Y, distance, Space.WORLD);
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x, position.y, position.z);
    }

    public abstract playWalkingAnimation();
    public abstract playIdleAnimation();
    public setIsVisible(isVisible: boolean) {}
}
