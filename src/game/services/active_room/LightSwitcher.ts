import { World } from '../../world/World';
import { WorldItem } from '../../world/world_items/item_types/WorldItem';

export interface LightSwitcher {
    on(room: WorldItem, world: World): Promise<void>;
    off(room: WorldItem, world: World): Promise<void>;
}
