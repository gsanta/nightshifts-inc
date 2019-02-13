import { all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';
import { watchDataLoadedState } from './user/UserActions';
import { UpdateWorldActions } from './game/actions/UpdateWorldActions';
import { GetWorldActions } from './game/actions/GetWorldActions';
import { GetUserActions } from './user/GetUserActions';
import { UpdateUserActions } from './user/UpdateUserActions';
import { SignoutActions } from './user/SignoutActions';
import LoginFacebookActions from './user/LoginFacebookActions';
import { UpdatePasswordActions } from './user/UpdatePasswordActions';
import LoginActions from './user/LoginActions';
import SignupActions from './user/SignupActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch(),
        LoginFacebookActions.watch(),
        GetUserActions.watch(),
        SignoutActions.watch(),
        LoginActions.watch(),
        SignupActions.watch(),
        UpdatePasswordActions.watch(),
        watchDataLoadedState(),
        UpdateUserActions.watch(),
        UpdateWorldActions.watch(),
        GetWorldActions.watchOnce()
    ]);
}
