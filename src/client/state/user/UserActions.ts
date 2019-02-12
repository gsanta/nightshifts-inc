import { User } from '../../stores/User';
import { PasswordUpdateDto } from '../../query/user/PasswordUpdateDto';
import { ActionType } from '../../stores/ActionType';
import { ErrorMessage } from '../../gui/ErrorMessage';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { AppState } from '../AppState';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getUserQuery = (state: AppState) => state.query.user;

export const loginRequest = (email: string, password: string) => {
    return {
        type: ActionType.LOGIN_REQUEST,
        email,
        password
    };
};

export function* login(action: { email: string, password: string }) {
    try {
        const userQuery = yield select(getUserQuery);

        const user = yield call([userQuery, userQuery.login], { email: action.email, password: action.password});
        yield put({ type: ActionType.LOGIN_SUCCESS, user});
    } catch (e) {
        yield put({type: ActionType.LOGIN_FAILURE, errors: [<ErrorMessage> e.response.data]});
    }
}

export function* watchLogin() {
    yield takeEvery(ActionType.LOGIN_REQUEST, login);
}

export const clearErrors = () => {
    return {
        type: ActionType.CLEAR_ERRORS
    };
};

export function* dataLoaded() {
    yield delay(1000);
    yield put({ type: ActionType.DATA_LOADED });
}

export function* watchDataLoadedState() {
    yield takeEvery(
        [
            ActionType.UPDATE_PASSWORD_SUCCESS,
            ActionType.UPDATE_USER_REQUEST
        ],
        dataLoaded
    );
}
