import { put, takeEvery, all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';
import { watchLoginFacebookRequest, watchGetUserRequest, watchSignupRequest, watchLogin, watchSignoutRequest, watchUpdatePassword, watchDataLoadedState, watchUpdateUserRequest } from './user/UserActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch(),
        watchLoginFacebookRequest(),
        watchGetUserRequest(),
        watchSignupRequest(),
        watchLogin(),
        watchSignoutRequest(),
        watchUpdatePassword(),
        watchDataLoadedState(),
        watchUpdateUserRequest()
    ]);
}
