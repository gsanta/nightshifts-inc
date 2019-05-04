import { Room } from '../../../world/world_items/room/Room';
import { World } from '../../../world/World';

export interface LightSwitcher {
    on(room: Room, world: World): Promise<void>;
    off(room: Room, world: World): Promise<void>;
}
