import { ActionType } from '../../ActionType';
import { ErrorMessage } from '../../../components/miscellaneous/ErrorMessage';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';
import { takeEvery, select, call, put } from 'redux-saga/effects';

export interface LoginRequestPayload {
    email: string;
    password: string;
}

class LoginActions implements WatchableAction<LoginRequestPayload> {
    public request(payload: LoginRequestPayload) {
        return {
            type: ActionType.LOGIN_REQUEST,
            email: payload.email,
            password: payload.password
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.LOGIN_REQUEST, this.fetch);
    }

    private *fetch(action: { email: string, password: string }) {
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            const user = yield call([userQuery, userQuery.login], { email: action.email, password: action.password});
            yield put({ type: ActionType.LOGIN_SUCCESS, user});
        } catch (e) {
            yield put({type: ActionType.LOGIN_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    }
}

export default new LoginActions();