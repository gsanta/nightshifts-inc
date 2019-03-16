import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';

export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];

    public addBorderItem(worldItem: WorldItem) {
        this.borderItems.push(worldItem);
    }
}
