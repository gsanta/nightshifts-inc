import BaseActions, { ActionType } from '../../ActionType';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { ErrorMessage } from '../../../gui/ErrorMessage';
import { WatchableAction } from '../../ActionType';

export interface SignupRequestPayload {
    email: string;
    password: string;
}

class SignupActions extends BaseActions implements WatchableAction<SignupRequestPayload> {
    public request(payload: SignupRequestPayload) {
        return {
            type: ActionType.SIGNUP_REQUEST,
            email: payload.email,
            password: payload.password
        };
    }

    public *watch() {
        yield takeEvery(ActionType.SIGNUP_REQUEST, this.fetch);
    }

    private *fetch(action: { email: string, password: string }) {
        try {
            const userQuery = yield select(this.getUserQuery);

            const user = yield call([userQuery, userQuery.signup], { email: action.email, password: action.password });
            yield put({type: ActionType.SIGNUP_SUCCESS, user});
        } catch (e) {
            yield put({type: ActionType.SIGNUP_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    }
}



export default new SignupActions();
