import { ActionType } from '../ActionType';
import { ApplicationSettings } from './model/ApplicationSettings';

const defaultState: ApplicationSettings = {
    user: null,
    language: 'en'
};


export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.UPDATE_SETTINGS_REQUEST:
            return {...state, language: action.settings.language};
        case ActionType.GET_USER_SUCCESS:
        case ActionType.UPDATE_SETTINGS_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
        case ActionType.LOGIN_SUCCESS:
        case ActionType.SIGNUP_SUCCESS:
        case ActionType.LOGIN_WITH_TEMPORARY_USER_REQUEST:
            return {...state, user: action.user};
        case ActionType.SIGNOUT_SUCCESS:
            return {...state, user: null};
        default:
            return state;
    }
};
