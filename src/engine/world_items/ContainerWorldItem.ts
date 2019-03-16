import { WorldItem } from '../../game/world_items/WorldItem';
import { Mesh } from 'babylonjs';
import { MeshTemplateConfig } from '../../game/model/core/templates/MeshTemplate';
import { MeshWrapper } from '../wrappers/MeshWrapper';

export class ContainerWorldItem extends WorldItem {
    public children: WorldItem[] = [];

    constructor(mesh: MeshWrapper<any>, name: string, config?: MeshTemplateConfig) {
        super(mesh, name, config);
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
    }
}
