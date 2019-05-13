import { ActionType } from '../ActionType';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';

export const gameActionDispatcherReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_GAME_ACTION_DISPATCHER:
            return action.gameActionDispatcher;
        default:
            return state;
    }
};
