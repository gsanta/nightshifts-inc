import { ActionType } from '../../ActionType';
import { ErrorMessage } from '../../../components/miscellaneous/ErrorMessage';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';
import { takeEvery, select, put, call } from 'redux-saga/effects';

export interface SignupRequestPayload {
    email: string;
    password: string;
}

class SignupActions implements WatchableAction<SignupRequestPayload> {
    public request(payload: SignupRequestPayload) {
        return {
            type: ActionType.SIGNUP_REQUEST,
            email: payload.email,
            password: payload.password
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.SIGNUP_REQUEST, this.fetch);
    }

    private *fetch(action: { email: string, password: string }) {
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            const user = yield call([userQuery, userQuery.signup], { email: action.email, password: action.password });
            yield put({type: ActionType.SIGNUP_SUCCESS, user});
        } catch (e) {
            yield put({type: ActionType.SIGNUP_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    }
}



export default new SignupActions();