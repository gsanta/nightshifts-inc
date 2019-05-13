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

    public hasDefaultAction = false;
    material: StandardMaterial;

    constructor(children: WorldItem[], type?: string) {
        super(null, type, null);
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

        const boundingCenter = this.boundingPolygon.getBoundingCenter();
        const [dx, dy] = boundingCenter.distanceTo(new Point(position.x, position.z));

        this.boundingPolygon = this.boundingPolygon.addX(dx);
        this.boundingPolygon = this.boundingPolygon.addY(dy);

        if (this.boundingBox) {
            this.boundingBox.position = new Vector3(position.x, 1, position.z);
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

    public getBoundingPolygon(): Polygon {
        return this.children[0].getBoundingPolygon();
    }

    public getAbsoluteBoundingPolygon(): Polygon {
        return this.children[0].getBoundingPolygon();
    }

    public setParent(worldItem: WorldItem) {
        this.mesh.parent = (<ContainerWorldItem> worldItem).mesh;
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }
}
