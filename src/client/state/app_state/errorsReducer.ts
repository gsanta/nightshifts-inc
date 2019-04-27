import { ErrorMessage } from '../../components/miscellaneous/ErrorMessage';
import { ActionType } from '../ActionType';

export const errorsReducer = (state = [], action): ErrorMessage[] => {
    switch (action.type) {
        case ActionType.SIGNUP_FAILURE:
        case ActionType.LOGIN_FAILURE:
        case ActionType.UPDATE_PASSWORD_FAILURE:
            return action.errors;
        case ActionType.UPDATE_PASSWORD_SUCCESS:
        case ActionType.UPDATE_USER_SUCCESS:
        case ActionType.LOGIN_FACEBOOK_SUCCESS:
        case ActionType.LOGIN_SUCCESS:
        case ActionType.SIGNUP_SUCCESS:
        case ActionType.CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};
