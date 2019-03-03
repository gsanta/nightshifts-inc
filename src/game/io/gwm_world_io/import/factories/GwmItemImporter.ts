import { GwmWorldItem } from 'game-worldmap-generator';
import { VisualWorldItem } from '../../../../world_items/VisualWorldItem';
import { World } from '../../../../model/World';
import { GenericItemImporter } from '../../../../model/core/factories/MeshFactory';

export interface GwmItemImporter extends GenericItemImporter<GwmWorldItem> {
    createItem(worldItem: GwmWorldItem, worldMap?: World): VisualWorldItem;
}
