import { WorldItem, SerializedMeshModel } from '../../game/world_items/WorldItem';
import { StandardMaterial } from 'babylonjs';
import { VectorModel } from '../../game/model/core/VectorModel';

export class ContainerWorldItem implements WorldItem {
    public children: WorldItem[] = [];

    public hasDefaultAction = false;
    materials: {[key: string]: StandardMaterial} = {};

    constructor(children: WorldItem[]) {
        this.children = children;
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
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
        this.children.forEach(child => child.translate(vectorModel));
    }

    public scale(vectorModel: VectorModel) {
        this.children.forEach(child => child.scale(vectorModel));
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
}
