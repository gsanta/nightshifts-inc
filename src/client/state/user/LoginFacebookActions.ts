import { ActionType } from '../../stores/ActionType';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';


export const LoginFacebookActions = {
    request: (accessToken: string) => ({
        type: ActionType.LOGIN_FACEBOOK_REQUEST,
        accessToken
    }),

    fetch: function* fetch(action: {accessToken: string}) {
        try {
            const userQuery = yield select(getUserQuery);

            const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
            yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
        } catch (error) {
            throw error;
        }
    },

    watch: function* watch() {
        yield takeEvery(ActionType.LOGIN_FACEBOOK_REQUEST, LoginFacebookActions.fetch);
    }
};
