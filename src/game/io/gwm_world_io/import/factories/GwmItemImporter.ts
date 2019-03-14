import { GwmWorldItem } from 'game-worldmap-generator';
import { WorldItem } from '../../../../world_items/WorldItem';
import { World } from '../../../../model/World';
import { GenericItemImporter } from '../../../../model/core/factories/MeshFactory';

export interface GwmItemImporter extends GenericItemImporter<GwmWorldItem> {
    createItem(worldItem: GwmWorldItem, worldMap?: World): WorldItem;
}
