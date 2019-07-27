import { Axis, Mesh, PhysicsImpostor, Skeleton, Space, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Point, Shape } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { GameObject } from './GameObject';
import flatten = require('lodash/flatten');

export interface WorldItemConfig {
    type: string;
    children: GameObject[];
    skeleton: Skeleton;
}

const defaultWorldItemConfig: WorldItemConfig = {
    type: 'default',
    children: [],
    skeleton: null
};

export class SimpleWorldItem implements GameObject {
    public temperature = 20 + Math.floor(Math.random() * 10);

    public mesh: Mesh;
    public skeleton?: Skeleton;
    public boundingMesh?: Mesh;

    public children: GameObject[] = [];
    public type: string;
    public label: string;
    public parent: GameObject;
    public boundingMeshVisible = false;
    public isActive: boolean;
    public health: number;

    public animatedMeshes: Mesh[] = [];

    protected boundingBox: Shape;

    protected counter = 1;

    constructor(mesh: Mesh, boundingBox: Shape, worldItemConfig?: Partial<WorldItemConfig>) {
        worldItemConfig = {...defaultWorldItemConfig, ...worldItemConfig};
        this.mesh = mesh;
        this.boundingBox = boundingBox;
        this.type = worldItemConfig.type;
        this.children = [...worldItemConfig.children];
        this.skeleton = worldItemConfig.skeleton;
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x, this.mesh.getAbsolutePosition().y, position.z);
        const center = this.mesh.getBoundingInfo().boundingSphere.centerWorld;
        this.boundingBox = this.boundingBox.setPosition(new Point(center.x, center.z));

        if (this.boundingMesh) {
            this.boundingMesh.position = new Vector3(position.x, 1, position.z);
        }
    }

    public getHeight(): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    public getRotation(): VectorModel {
        const vector = this.mesh.rotationQuaternion.toEulerAngles();
        return new VectorModel(vector.x, vector.y, vector.z);
    }

    public setBoudingBox(shape: Shape) {
        this.boundingBox = shape;
        const center = shape.getBoundingCenter();
        this.setPosition(new VectorModel(center.x, this.mesh.position.y, center.y));
        this.boundingBox = shape;
    }


    public getBoundingBox(): Shape {
        return this.boundingBox;
    }

    public intersectsWorldItem(otherWorldItem: GameObject): boolean {
        return this.mesh.intersectsMesh(otherWorldItem.mesh);
    }

    public setImpostor(impostor: PhysicsImpostor) {
        this.mesh.physicsImpostor = impostor;
    }
}
