import { ActionType } from '../ActionType';


export const userReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.GET_USER_SUCCESS:
        case ActionType.UPDATE_USER_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
        case ActionType.LOGIN_SUCCESS:
        case ActionType.SIGNUP_SUCCESS:
        case ActionType.LOGIN_WITH_TEMPORARY_USER_REQUEST:
            return action.user;
        case ActionType.SIGNOUT_SUCCESS:
            return null;
        default:
            return state;
    }
};
