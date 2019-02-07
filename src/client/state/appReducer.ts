import { AppState } from './AppState';
import { ActionType } from '../stores/ActionType';
import { UserQuery } from '../query/user/UserQuery';
import { User } from '../stores/User';

const initialState: AppState = {
    config: {
        baseUrl: null
    },
    query: {
        user: new UserQuery()
    },
    world: null,
    user: User.NULL_USER_MODEL,
    appLoadingState: 'loading',
    dataLoadingState: 'loaded',
    errors: []
};

export interface Action {
    type: string;
    data?: any;
    user?: any;
    errors?: any;
}

export const appReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.GET_USER_FAILURE:
            return {...state, ...{
                appLoadingState: 'ready'
            }};

        case ActionType.SIGNUP_FAILURE:
        case ActionType.LOGIN_FAILURE:
            return {...state, ...{
                errors: action.errors
            }};

        case ActionType.GET_USER_SUCCESS:
            return {...state, ...{
                user: action.user,
                appLoadingState: 'ready'
            }};

        case ActionType.UPDATE_USER_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
        case ActionType.SIGNUP_SUCCESS:
            return {...state, ...{
                user: action.user
            }};

        case ActionType.SIGNOUT_SUCCESS:
            return {...state, ...{
                user: User.NULL_USER_MODEL
            }};

        case ActionType.CLEAR_ERRORS:
            return {...state, ...{
                errors: []
            }};
        default:
          return state;
    }
};
