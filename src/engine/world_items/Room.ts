import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { MeshWrapper } from '../wrappers/MeshWrapper';

export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];
    public mesh: MeshWrapper<any>;
    public name: string;

    constructor(mesh: MeshWrapper<any>, name: string) {
        super([]);
        this.name = name;
        this.mesh = mesh;
    }

    public addBorderItem(worldItem: WorldItem) {
        this.borderItems.push(worldItem);
    }
}
