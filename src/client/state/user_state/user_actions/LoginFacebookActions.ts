import { ActionType } from '../../ActionType';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';
import { takeEvery, select, call, put } from 'redux-saga/effects';

class LoginFacebookActions implements WatchableAction<string> {
    public request(accessToken: string) {
        return {
            type: ActionType.LOGIN_FACEBOOK_REQUEST,
            accessToken
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.LOGIN_FACEBOOK_REQUEST, this.fetch);
    }

    public *fetch(action: {accessToken: string}) {
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
            yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
        } catch (error) {
            throw error;
        }
    }
}

export default new LoginFacebookActions();
