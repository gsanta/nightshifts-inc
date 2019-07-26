import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameObject } from '../world_items/item_types/GameObject';
import { World } from '../World';
import { GenericItemImporter } from './WorldFactory';

export interface GwmItemImporter extends GenericItemImporter<WorldItemInfo> {
    createItem(worldItem: WorldItemInfo, worldMap?: World): GameObject;
}
