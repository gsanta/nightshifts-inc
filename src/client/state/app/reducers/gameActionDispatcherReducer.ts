import { ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';

export const gameActionDispatcherReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.UPDATE_GAME_REQUEST:
        case ActionType.SET_WORLD_REQUEST:
            return new ActionDispatcher(action.world);
        default:
            return state;
    }
};
