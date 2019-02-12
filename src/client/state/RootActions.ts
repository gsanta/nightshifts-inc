import { all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';
import { watchLogin, watchDataLoadedState } from './user/UserActions';
import { UpdateWorldActions } from './game/actions/UpdateWorldActions';
import { GetWorldActions } from './game/actions/GetWorldActions';
import { GetUserActions } from './user/GetUserActions';
import { UpdateUserActions } from './user/UpdateUserActions';
import { SignoutActions } from './user/SignoutActions';
import { LoginFacebookActions } from './user/LoginFacebookActions';
import { UpdatePasswordActions } from './user/UpdatePasswordActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch(),
        LoginFacebookActions.watch(),
        GetUserActions.watch(),
        SignoutActions.watch(),
        watchLogin(),
        SignoutActions.watch(),
        UpdatePasswordActions.watch(),
        watchDataLoadedState(),
        UpdateUserActions.watch(),
        UpdateWorldActions.watch(),
        GetWorldActions.watchOnce()
    ]);
}
