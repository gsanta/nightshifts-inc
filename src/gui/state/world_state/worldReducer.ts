import { ActionType } from '../ActionType';

export const worldReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.UPDATE_GAME_REQUEST:
        case ActionType.SET_WORLD_REQUEST:
            return action.world;
        default:
            return state;
    }
};
