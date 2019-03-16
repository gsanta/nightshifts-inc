import { WorldItem } from '../../game/world_items/WorldItem';
import { Mesh } from 'babylonjs';
import { MeshTemplateConfig } from '../../game/model/core/templates/MeshTemplate';

export class ContainerWorldItem extends WorldItem {
    public children: WorldItem[] = [];

    constructor(mesh: Mesh, name: string, config?: MeshTemplateConfig) {
        super(mesh, name, config);
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
    }
}
