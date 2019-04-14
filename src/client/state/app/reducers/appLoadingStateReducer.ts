import { ActionType } from '../../ActionType';
import { AppLoadingState } from '../AppState';

export const appLoadingStateReducer = (state: AppLoadingState = 'loading' , action): AppLoadingState => {
    switch (action.type) {
        case ActionType.GET_USER_FAILURE:
        case ActionType.GET_USER_SUCCESS:
            return 'ready';
        default:
            return state;
    }
};
