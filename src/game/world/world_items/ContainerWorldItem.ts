import { WorldItem, SerializedMeshModel } from './WorldItem';
import { StandardMaterial, Mesh, Vector3 } from 'babylonjs';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { Polygon } from '@nightshifts.inc/geometry';
import flatten from 'lodash/flatten';

export class ContainerWorldItem implements WorldItem {
    public children: WorldItem[] = [];
    public container: WorldItem;
    public mesh: Mesh;
    public neighbours: WorldItem[] = [];
    public parent: WorldItem;

    public hasDefaultAction = false;
    material: StandardMaterial;

    constructor(children: WorldItem[]) {
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

    public rotateAtCenter(vectorModel: VectorModel, amount: number): void {
        this.children.forEach(child => child.rotateAtCenter(vectorModel, amount));
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
