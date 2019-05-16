import { WorldItem, SerializedMeshModel } from './WorldItem';
import { StandardMaterial, Mesh, Vector3 } from '@babylonjs/core';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';
import { Polygon, Point } from '@nightshifts.inc/geometry';
import flatten from 'lodash/flatten';
import { SimpleWorldItem } from './SimpleWorldItem';

export class ContainerWorldItem extends SimpleWorldItem {
    public children: WorldItem[] = [];
    public container: WorldItem;
    public mesh: Mesh;
    public neighbours: WorldItem[] = [];
    public parent: WorldItem;
    public borderItems: WorldItem[] = [];

    public hasDefaultAction = false;
    material: StandardMaterial;

    constructor(children: WorldItem[], type?: string, boundingBox?: Polygon) {
        super(null, type, boundingBox);
        this.children = children;
    }

    public getAllMeshes(): Mesh[] {
        return flatten(this.children.map(child => child.getAllMeshes()));
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
        worldItem.parent = this;
    }

    public doDefaultAction() {
        throw new Error('Default action not specified for ContainerWorldItem.');
    }

    public serialize(): SerializedMeshModel {
        throw new Error('Not yet implemented');
    }

    public unserialize(model: SerializedMeshModel): WorldItem {
        throw new Error('Not yet implemented');
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
            this.mesh.translate(toVector3(vectorModel), 1);
        }
        // this.children.forEach(child => child.translate(vectorModel));
    }

    public scale(vectorModel: VectorModel) {
        this.children.forEach(child => child.scale(vectorModel));
    }

    public getCenterPosition() {

        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public getScale(): VectorModel {
        return this.children[0].getScale();
    }

    public getRotation(): VectorModel {
        return null;
    }

    public clone(): ContainerWorldItem {
        const clonedChildren = this.children.map(child => child.clone());

        return new ContainerWorldItem(clonedChildren);
    }

    public getBoundingBox(): Polygon {
        return this.boundingBox;
    }

    public getAbsoluteBoundingPolygon(): Polygon {
        return this.children[0].getBoundingBox();
    }

    public setParent(worldItem: WorldItem) {
        this.mesh.parent = (<ContainerWorldItem> worldItem).mesh;
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }


    public hasConnectionWith(worldItem: WorldItem): boolean {
        return [...this.children, ...this.borderItems].indexOf(worldItem) !== -1;
    }
}
