import { ActionType } from '../../ActionType';
import { World } from '../../../../game/model/World';

class SetWorldActions {
    public request(world: World) {
        return {
            type: ActionType.SET_WORLD_REQUEST,
            world
        };
    }
}

export default new SetWorldActions();
