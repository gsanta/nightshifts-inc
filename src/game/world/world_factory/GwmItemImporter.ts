import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { WorldItem } from '../world_items/WorldItem';
import { World } from '../World';
import { GenericItemImporter } from './WorldFactory';

export interface GwmItemImporter extends GenericItemImporter<GwmWorldItem> {
    createItem(worldItem: GwmWorldItem, worldMap?: World): WorldItem;
}
