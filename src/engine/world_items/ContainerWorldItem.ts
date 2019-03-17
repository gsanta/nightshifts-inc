import { WorldItem, SerializedMeshModel } from '../../game/world_items/WorldItem';
import { StandardMaterial } from 'babylonjs';

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

    public clone(): ContainerWorldItem {
        const clonedChildren = this.children.map(child => child.clone());

        return new ContainerWorldItem(clonedChildren);
    }
}
