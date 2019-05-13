import { ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';

class SetGameActionDispatcherActions {
    public request(gameActionDispatcher: ActionDispatcher) {
        return {
            type: ActionType.SET_GAME_ACTION_DISPATCHER,
            gameActionDispatcher
        };
    }
}

export default new SetGameActionDispatcherActions();
