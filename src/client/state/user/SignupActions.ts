import { ActionType } from '../../stores/ActionType';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';
import { ErrorMessage } from '../../gui/ErrorMessage';



export const SignupActions = {
    request: (email: string, password: string) => ({
        type: ActionType.SIGNUP_REQUEST,
        email,
        password
    }),

    fetch: function* fetch(action: { email: string, password: string }) {
        try {
            const userQuery = yield select(getUserQuery);

            const user = yield call([userQuery, userQuery.signup], { email: action.email, password: action.password });
            yield put({type: ActionType.SIGNUP_SUCCESS, user});
        } catch (e) {
            yield put({type: ActionType.SIGNUP_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    },

    watch: function* watch() {
        yield takeEvery(ActionType.SIGNUP_REQUEST, SignupActions.fetch);
    }
};
