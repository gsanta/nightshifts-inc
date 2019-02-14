import { AppState } from './RootState';
import { ActionType } from '../ActionType';
import { UserQuery } from '../../query/user/UserQuery';
import { User } from '../user/User';
import { GameRequests } from '../game/GameRequests';

const initialState: AppState = {
    config: {
        baseUrl: null
    },
    query: {
        user: new UserQuery(),
        game: new GameRequests()
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
    world?: any;
}

export const appReducer = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
        case ActionType.GET_USER_FAILURE:
            return {...state, ...{
                appLoadingState: 'ready'
            }};

        case ActionType.UPDATE_PASSWORD_REQUEST:
            return {...state, ...{
                dataLoadingState: 'loading'
            }};
        case ActionType.SIGNUP_FAILURE:
        case ActionType.LOGIN_FAILURE:
        case ActionType.UPDATE_PASSWORD_FAILURE:
            return {...state, ...{
                errors: action.errors,
                dataLoadingState: 'loaded'
            }};

        case ActionType.GET_USER_SUCCESS:
            return {...state, ...{
                user: action.user,
                appLoadingState: 'ready'
            }};

        case ActionType.UPDATE_PASSWORD_SUCCESS:
            return {...state, ...{
                errors: [],
                dataLoadingState: 'recently_loaded'
            }};

        case ActionType.UPDATE_USER_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
        case ActionType.LOGIN_SUCCESS:
        case ActionType.SIGNUP_SUCCESS:
            return {...state, ...{
                user: action.user,
                errors: [],
                dataLoadingState: 'recently_loaded'
            }};

        case ActionType.SIGNOUT_SUCCESS:
            return {...state, ...{
                user: User.NULL_USER_MODEL
            }};

        case ActionType.CLEAR_ERRORS:
            return {...state, ...{
                errors: []
            }};

        case ActionType.DATA_LOADED:
            return {...state, ...{
                dataLoadingState: 'loaded'
            }};

        case ActionType.UPDATE_GAME_REQUEST:
            return {...state, ...{
                world: action.world
            }};
        default:
          return state;
    }
};
