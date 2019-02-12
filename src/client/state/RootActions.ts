import { all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';
import { watchLoginFacebookRequest, watchSignupRequest, watchLogin, watchSignoutRequest, watchUpdatePassword, watchDataLoadedState, watchUpdateUserRequest } from './user/UserActions';
import { UpdateWorldActions } from './game/actions/UpdateWorldActions';
import { GetWorldActions } from './game/actions/GetWorldActions';
import { LoadUserActions } from './user/LoadUserActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch(),
        watchLoginFacebookRequest(),
        LoadUserActions.watch(),
        watchSignupRequest(),
        watchLogin(),
        watchSignoutRequest(),
        watchUpdatePassword(),
        watchDataLoadedState(),
        watchUpdateUserRequest(),
        UpdateWorldActions.watch(),
        GetWorldActions.watchOnce()
    ]);
}
