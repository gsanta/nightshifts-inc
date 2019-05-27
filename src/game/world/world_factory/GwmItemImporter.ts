import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { WorldItem } from '../world_items/item_types/WorldItem';
import { World } from '../World';
import { GenericItemImporter } from './WorldFactory';

export interface GwmItemImporter extends GenericItemImporter<WorldItemInfo> {
    createItem(worldItem: WorldItemInfo, worldMap?: World): WorldItem;
}
