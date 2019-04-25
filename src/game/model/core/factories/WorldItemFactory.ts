import { GwmWorldItem } from 'game-worldmap-generator';
import { World } from '../../World';
import { WorldItem } from '../../../world_items/WorldItem';


export interface WorldItemFactory {
    createItem(worldItem: GwmWorldItem, world: World): WorldItem;
}
