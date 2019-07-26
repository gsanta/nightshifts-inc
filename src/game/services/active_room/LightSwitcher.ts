import { World } from '../../world/World';
import { GameObject } from '../../world/world_items/item_types/GameObject';

export interface LightSwitcher {
    on(room: GameObject, world: World): Promise<void>;
    off(room: GameObject, world: World): Promise<void>;
}
