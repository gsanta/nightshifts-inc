import { AppState } from './AppState';
import { ActionType } from '../stores/ActionType';

const initialState: AppState = {
    config: {
        baseUrl: null
    },
    query: {
        user: null
    },
    world: null,
    user: null
};

export interface Action {
    type: string;
    data?: any;
}

export const appReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.GET_USER_SUCCESS:
        case ActionType.UPDATE_USER_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
            return {...state, ...{
                user: action.data
            }};
        default:
          return state;
    }
};
