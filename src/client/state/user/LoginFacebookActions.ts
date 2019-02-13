import { ActionType } from '../../stores/ActionType';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';
import BaseActions from '../BaseActions';
import { WatchableAction } from '../WatchableAction';

class LoginFacebookActions extends BaseActions implements WatchableAction<string> {
    public request(accessToken: string) {
        return {
            type: ActionType.LOGIN_FACEBOOK_REQUEST,
            accessToken
        };
    }

    public *watch() {
        yield takeEvery(ActionType.LOGIN_FACEBOOK_REQUEST, this.fetch);
    }

    public *fetch(action: {accessToken: string}) {
        try {
            const userQuery = yield select(getUserQuery);

            const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
            yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
        } catch (error) {
            throw error;
        }
    }
}

export default new LoginFacebookActions();

// export const LoginFacebookActions = {
//     request: (accessToken: string) => ({
//         type: ActionType.LOGIN_FACEBOOK_REQUEST,
//         accessToken
//     }),

//     fetch: function* fetch(action: {accessToken: string}) {
//         try {
//             const userQuery = yield select(getUserQuery);

//             const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
//             yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
//         } catch (error) {
//             throw error;
//         }
//     },

//     watch: function* watch() {
//         yield takeEvery(ActionType.LOGIN_FACEBOOK_REQUEST, LoginFacebookActions.fetch);
//     }
// };
