import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appReducer';
import GetUserActions from '../user/actions/GetUserActions';
import { all } from 'redux-saga/effects';
import GetWorldActions from '../game/actions/GetWorldActions';
import LoginFacebookActions from '../user/actions/LoginFacebookActions';
import SignoutActions from '../user/actions/SignoutActions';
import LoginActions from '../user/actions/LoginActions';
import SignupActions from '../user/actions/SignupActions';
import UpdatePasswordActions from '../user/actions/UpdatePasswordActions';
import UpdateUserActions from '../user/actions/UpdateUserActions';
import GrabToolActions from '../game/actions/GrabToolActions';
import ReleaseToolActions from '../game/actions/ReleaseToolActions';
import TurnOnAllLigthsActions from '../game/actions/debug_actions/TurnOnAllLigthsActions';

const sagaMiddleware = createSagaMiddleware();

export const AppStore = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(function* rootSaga() {
    yield all([
        GetWorldActions.watch(),
        LoginFacebookActions.watch(),
        GetUserActions.watch(),
        SignoutActions.watch(),
        LoginActions.watch(),
        SignupActions.watch(),
        UpdatePasswordActions.watch(),
        UpdateUserActions.watch(),
        // UpdateWorldActions.watch(),
        GetWorldActions.watch(),
        GrabToolActions.watch(),
        ReleaseToolActions.watch(),
        TurnOnAllLigthsActions.watch()
    ]);
});

AppStore.dispatch(GetUserActions.request());

