import { ActionType } from '../ActionType';

export const gameServicesReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_WORLD_REQUEST:
            return action.services;
        default:
            return state;
    }
};
