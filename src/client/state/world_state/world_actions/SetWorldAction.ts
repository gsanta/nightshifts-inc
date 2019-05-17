import { ActionType } from '../../ActionType';
import { World } from '../../../../game/world/World';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';

class SetWorldActions {
    public request(world: World, actionDispatcher: ActionDispatcher) {
        return {
            type: ActionType.SET_WORLD_REQUEST,
            world,
            actionDispatcher
        };
    }
}

export default new SetWorldActions();
