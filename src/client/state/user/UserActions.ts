import { User } from '../../stores/User';
import { PasswordUpdateDto } from '../../query/user/PasswordUpdateDto';
import { ActionType } from '../../stores/ActionType';
import { ErrorMessage } from '../../gui/ErrorMessage';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { AppState } from '../AppState';
import { UserQuery } from '../../query/user/UserQuery';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getUserQuery = (state: AppState) => state.query.user;

export const updateUserRequest = (user: User) => {
    return {
        type: ActionType.UPDATE_USER_REQUEST,
        user
    };
};

export function* updateUser(action: {user: User}) {
    try {
        const userQuery = yield select(getUserQuery);

        const updatedUser = yield call([userQuery, userQuery.updateUser], action.user);
        yield put({type: ActionType.UPDATE_USER_SUCCESS, user: updatedUser});
    } catch (error) {
        throw error;
    }
}

export function* watchUpdateUserRequest() {
    yield takeEvery(ActionType.UPDATE_USER_REQUEST, updateUser);
}

export const signoutRequest = () => {
    return {
        type: ActionType.SIGNOUT_REQUEST
    };
};

export function* signout() {
    const userQuery = yield select(getUserQuery);

    userQuery.signout();
    yield put({type: ActionType.SIGNOUT_SUCCESS});
}

export function* watchSignoutRequest() {
    yield takeEvery(ActionType.SIGNOUT_REQUEST, signout);
}

export function* loginFacebook(action: { accessToken: string }) {
    try {
        const userQuery = yield select(getUserQuery);

        const user = yield call([userQuery, userQuery.loginFacebook], action.accessToken);
        yield put({type: ActionType.LOGIN_FACEBOOK_SUCCESS, user});
    } catch (error) {
        throw error;
    }
}

export const loginFacebookRequest = (accessToken: string) => {
    return {
        type: ActionType.LOGIN_FACEBOOK_REQUEST,
        accessToken
    };
};

export function* watchLoginFacebookRequest() {
    yield takeEvery(ActionType.LOGIN_FACEBOOK_REQUEST, loginFacebook);
}

export const signupRequest = (email: string, password: string) => {
    return {
        type: ActionType.SIGNUP_REQUEST,
        email,
        password
    };
};

export function* signup(action: { email: string, password: string }) {
    try {
        const userQuery = yield select(getUserQuery);

        const user = yield call([userQuery, userQuery.signup], { email: action.email, password: action.password });
        yield put({type: ActionType.SIGNUP_SUCCESS, user});
    } catch (e) {
        yield put({type: ActionType.SIGNUP_FAILURE, errors: [<ErrorMessage> e.response.data]});
    }
}

export function* watchSignupRequest() {
    yield takeEvery(ActionType.SIGNUP_REQUEST, signup);
}

export const updatePassworRequest = (user: User, newPassword: string, oldPassword: string) => {
    return {
        type: ActionType.UPDATE_PASSWORD_REQUEST,
        newPassword,
        oldPassword,
        user
    };
};

export function* updatePassword(action: { user: User, newPassword: string, oldPassword: string }) {
    const passwordUpdateDto: PasswordUpdateDto = {
        id: action.user.id,
        oldPassword: action.oldPassword,
        newPassword: action.newPassword
    };
    try {
        const userQuery = yield select(getUserQuery);

        yield call([userQuery, userQuery.updatePassword], passwordUpdateDto);
        yield put({ type: ActionType.UPDATE_PASSWORD_SUCCESS});
    } catch (e) {
        yield put({type: ActionType.UPDATE_PASSWORD_FAILURE, errors: [<ErrorMessage> e.response.data]});
    }

}

export function* watchUpdatePassword() {
    yield takeEvery(ActionType.UPDATE_PASSWORD_REQUEST, updatePassword);
}

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
