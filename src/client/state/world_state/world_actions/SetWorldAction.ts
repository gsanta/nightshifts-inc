import { ActionType } from '../../ActionType';
import { World } from '../../../../game/world/World';

class SetWorldActions {
    public request(world: World) {
        return {
            type: ActionType.SET_WORLD_REQUEST,
            world
        };
    }
}

export default new SetWorldActions();
