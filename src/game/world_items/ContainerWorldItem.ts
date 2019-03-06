import { WorldItem } from './WorldItem';
import { Mesh } from 'babylonjs';
import { MeshTemplateConfig } from '../model/core/templates/MeshTemplate';


export class ContainerWorldItem extends WorldItem {
    public children: WorldItem[] = [];

    constructor(mesh: Mesh, name: string, config?: MeshTemplateConfig) {
        super(mesh, name, config);
    }

    public addChild(worldItem: WorldItem) {
        this.children.push(worldItem);
    }
}
