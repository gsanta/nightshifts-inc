import { Scene, Mesh, Skeleton, Axis, Space, Quaternion } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { MeshTemplate } from '../../../model/core/templates/MeshTemplate';
import { SimpleWorldItem } from './SimpleWorldItem';
import { VectorModel } from '../../../model/core/VectorModel';

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


export class Player extends SimpleWorldItem {
    public health = 100;
    private scene: Scene;
    public type = 'player';

    constructor(mesh: Mesh, skeleton: Skeleton, scene: Scene, boundingPolygon: Polygon) {
        super(mesh, boundingPolygon, { type: 'player' });

        this.skeleton = skeleton;
    }

    public getCenterPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }
}
