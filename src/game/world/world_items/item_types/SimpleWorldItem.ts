import { Axis, Mesh, PhysicsImpostor, Skeleton, Space, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Point, Shape } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { EmptyCommand } from '../action_strategies/EmptyCommand';
import { WorldItemActionCommand } from '../action_strategies/WorldItemActionCommand';
import { SerializedMeshModel, WorldItem } from './WorldItem';
import flatten = require('lodash/flatten');

export interface WorldItemConfig {
    type: string;
    children: WorldItem[];
    skeleton: Skeleton;
}

const defaultWorldItemConfig: WorldItemConfig = {
    type: 'default',
    children: [],
    skeleton: null
};

export class SimpleWorldItem implements WorldItem {
    public temperature = 20 + Math.floor(Math.random() * 10);

    public mesh: Mesh;
    public skeleton?: Skeleton;
    private children: WorldItem[] = [];
    public boundingMesh?: Mesh;
    public type: string;
    public label: string;
    public parent: WorldItem;
    public neighbours: WorldItem[] = [];
    public boundingMeshVisible = false;
    public isActive: boolean;
    public health: number;

    public animatedMeshes: Mesh[] = [];

    public defaultAction: WorldItemActionCommand = new EmptyCommand();

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

    public getChildren(): WorldItem[] {
        return this.children;
    }

    public hasConnectionWith(worldItem: WorldItem): boolean {
        return [...this.children, ...this.neighbours].indexOf(worldItem) !== -1;
    }

    public getAllMeshes(): Mesh[] {
        if (this.children.length > 0) {
            return [this.mesh, ...flatten(this.children.map(child => child.getAllMeshes()))];
        } else {
            return [this.mesh];
        }
    }

    public rotateY(amount: number) {
        this.mesh.rotate(Axis.Y, amount, Space.WORLD);
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x, this.mesh.getAbsolutePosition().y, position.z);
        const center = this.mesh.getBoundingInfo().boundingSphere.centerWorld;
        this.boundingBox = this.boundingBox.setPosition(new Point(center.x, center.z));

        if (this.boundingMesh) {
            this.boundingMesh.position = new Vector3(position.x, 1, position.z);
        }
    }

    public translate(vectorModel: VectorModel) {
        if (this.mesh) {
            this.mesh.translate(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z), 1);
        }
    }

    public getHeight(): number {
        return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    }

    public getCenterPosition(): VectorModel {
        const center = this.getBoundingBox().getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getRotation(): VectorModel {
        const vector = this.mesh.rotationQuaternion.toEulerAngles();
        return new VectorModel(vector.x, vector.y, vector.z);
    }

    public getBoundingMesh(): Mesh {
        return this.boundingMesh;
    }

    public setBoundingMesh(mesh: Mesh) {
        this.boundingMesh = mesh;
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

    public setParent(worldItem: WorldItem) {
        this.mesh.parent = worldItem.mesh;
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }

    public intersectsWorldItem(otherWorldItem: WorldItem): boolean {
        return this.mesh.intersectsMesh(otherWorldItem.mesh);
    }

    public setVisible(isVisible: boolean) {
        this.mesh.isVisible = isVisible;
    }

    public setBoundingMeshVisible(isVisible: boolean) {
        if (this.boundingMesh) {
            this.boundingMesh.isVisible = isVisible;
        }
        this.boundingMeshVisible = isVisible;
    }

    public isBoundingMeshVisible(): boolean {
        return this.boundingMeshVisible;
    }

    public setImpostor(impostor: PhysicsImpostor) {
        this.mesh.physicsImpostor = impostor;
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
        worldItem.parent = this;
    }
}
