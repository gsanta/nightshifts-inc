import { World } from '../../model/game_objects/World';
import { GameObject } from '../../model/game_objects/GameObject';

export interface LightSwitcher {
    on(room: GameObject, world: World): Promise<void>;
    off(room: GameObject, world: World): Promise<void>;
}
