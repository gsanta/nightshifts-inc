import { LightSwitcher } from './LightSwitcher';
import { Room } from '../../../world/world_items/room/Room';
import { World } from '../../../world/World';


export class FlashingLightSwitcher implements LightSwitcher {
    public on(room: Room, world: World): Promise<void> {

    }

    public off(room: Room, world: World): Promise<void> {
    }
}
