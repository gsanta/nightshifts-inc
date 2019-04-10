import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { appReducer } from './root/rootReducer';
import GetUserActions from './user/actions/GetUserActions';
import { all } from 'redux-saga/effects';
import GetWorldActions from './game/actions/GetWorldActions';
import LoginFacebookActions from './user/actions/LoginFacebookActions';
import SignoutActions from './user/actions/SignoutActions';
import LoginActions from './user/actions/LoginActions';
import SignupActions from './user/actions/SignupActions';
import UpdatePasswordActions from './user/actions/UpdatePasswordActions';
import SetDataLoadedActions from './root/actions/SetDataLoadedActions';
import UpdateUserActions from './user/actions/UpdateUserActions';
import UpdateWorldActions from './game/actions/UpdateWorldActions';

const sagaMiddleware = createSagaMiddleware();

export const GlobalStore = createStore(
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
        SetDataLoadedActions.watch(),
        UpdateUserActions.watch(),
        // UpdateWorldActions.watch(),
        GetWorldActions.watch()
    ]);
});

GlobalStore.dispatch(GetUserActions.request());

