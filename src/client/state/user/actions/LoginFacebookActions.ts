import { ActionType } from '../../ActionType';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';

class LoginFacebookActions implements WatchableAction<string> {
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
            const userQuery = yield select(UserSelections.getUserQuery);

            const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
            yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
        } catch (error) {
            throw error;
        }
    }
}

export default new LoginFacebookActions();
