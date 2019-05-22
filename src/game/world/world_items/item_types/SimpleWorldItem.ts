import { Axis, Mesh, PhysicsImpostor, Space, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Point, Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { EmptyCommand } from '../action_strategies/EmptyCommand';
import { WorldItemActionCommand } from '../action_strategies/WorldItemActionCommand';
import { SerializedMeshModel, WorldItem } from './WorldItem';
import flatten = require('lodash/flatten');

export interface WorldItemConfig {
    type: string;
    children: WorldItem[];
}

const defaultWorldItemConfig: WorldItemConfig = {
    type: 'default',
    children: []
};

export class SimpleWorldItem implements WorldItem {
    // TODO: find a better solution for temperature and lampBehaviour, they are only needed for Room
    public temperature = 20 + Math.floor(Math.random() * 10);
    public lampBehaviour: 'offAlways' | 'onAlways' | 'onWhenActive' | 'flashesWhenEntering' = 'onWhenActive';

    public mesh: Mesh;
    private children: WorldItem[] = [];
    public boundingMesh?: Mesh;
    public type: string;
    public label: string;
    public hasDefaultAction = false;
    public parent: WorldItem;
    public neighbours: WorldItem[] = [];
    public material: StandardMaterial;
    public boundingMeshVisible = false;
    public isActive: boolean;
    private impostor: PhysicsImpostor;

    private defaultAction: WorldItemActionCommand = new EmptyCommand();

    protected boundingBox: Polygon;

    protected counter = 1;

    constructor(mesh: Mesh, boundingBox: Polygon, worldItemConfig?: Partial<WorldItemConfig>) {
        worldItemConfig = {...defaultWorldItemConfig, ...worldItemConfig};
        this.mesh = mesh;
        this.boundingBox = boundingBox;
        this.type = worldItemConfig.type;
        this.children = [...worldItemConfig.children];
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

    public doDefaultAction() {
        this.defaultAction.execute();
    }

    public setDefaultAction(command: WorldItemActionCommand) {
        this.defaultAction = command;
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.type,
            scaling: {
                x: null,
                y: null,
                z: null,
            },
            translate: {
                x: this.getCenterPosition().x,
                y: this.getCenterPosition().y,
                z: this.getCenterPosition().z
            },
            additionalData: {
                rotation: this.getRotation().y
            }
        };
    }

    public unserialize(model: SerializedMeshModel): WorldItem {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        const name = this.type;

        const clone = new SimpleWorldItem(clonedMesh, this.boundingBox, {type: name});
        this.copyTo(clone);

        return clone;
    }

    public rotateY(amount: number) {
        this.mesh.rotate(Axis.Y, amount, Space.WORLD);
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x, position.y, position.z);

        const boundingCenter = this.boundingBox.getBoundingCenter();
        const [dx, dy] = boundingCenter.distanceTo(new Point(position.x, position.z));

        this.boundingBox = this.boundingBox.addX(dx);
        this.boundingBox = this.boundingBox.addY(dy);

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
        return this.mesh ? this.mesh.getBoundingInfo().boundingBox.maximumWorld.y * 2 : 12;
    }

    public getCenterPosition(): VectorModel {
        const center = (<Rectangle> this.getBoundingBox()).getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getRotation(): VectorModel {
        return new VectorModel(0, 0, 0);
    }

    public getBoundingMesh(): Mesh {
        return this.boundingMesh;
    }

    public setBoundingMesh(mesh: Mesh) {
        this.boundingMesh = mesh;
    }

    public setBoudingBox(polygon: Polygon) {
        this.boundingBox = polygon;
        const center = polygon.getBoundingCenter();
        this.setPosition(new VectorModel(center.x, this.mesh.position.y, center.y));
        this.boundingBox = polygon;
    }


    public getBoundingBox(): Polygon {
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
        this.impostor = impostor;
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
        worldItem.parent = this;
    }

    protected copyTo(meshModel: WorldItem): WorldItem {
        meshModel.type = this.type;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }
}
