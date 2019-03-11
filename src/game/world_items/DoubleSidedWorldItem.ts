import { WorldItem } from './WorldItem';
import { Mesh } from 'babylonjs';
import { MeshTemplateConfig } from '../model/core/templates/MeshTemplate';


export class DoubleSidedWorldItem extends WorldItem {
    public worldItem1: WorldItem;
    public worldItem2: WorldItem;

    constructor(worldItem1: WorldItem, worldItem2: WorldItem, name: string, config?: MeshTemplateConfig) {
        super(worldItem1.mesh, name, config);

        this.worldItem1 = worldItem1;
        this.worldItem2 = worldItem2;
    }
}
