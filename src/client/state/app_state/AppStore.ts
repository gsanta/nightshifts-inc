import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appReducer';
import GetUserActions from '../user_state/user_actions/GetUserActions';
import { all } from 'redux-saga/effects';
import GetWorldActions from '../world_state/world_actions/GetWorldActions';
import LoginFacebookActions from '../user_state/user_actions/LoginFacebookActions';
import SignoutActions from '../user_state/user_actions/SignoutActions';
import LoginActions from '../user_state/user_actions/LoginActions';
import SignupActions from '../user_state/user_actions/SignupActions';
import UpdatePasswordActions from '../user_state/user_actions/UpdatePasswordActions';
import UpdateUserActions from '../user_state/user_actions/UpdateUserActions';
import GrabToolActions from '../tools_state/tools_actions/GrabToolActions';
import ReleaseToolActions from '../tools_state/tools_actions/ReleaseToolActions';
import TurnOnAllLigthsActions from '../debug_state/debug_actions/TurnOnAllLigthsActions';
import ShowRoomLabelsActions from '../debug_state/debug_actions/ShowRoomLabelsActions';
import ShowBoundingBoxesAction from '../debug_state/debug_actions/ShowBoundingBoxesActions';

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
        TurnOnAllLigthsActions.watch(),
        ShowRoomLabelsActions.watch(),
        ShowBoundingBoxesAction.watch()
    ]);
});

AppStore.dispatch(GetUserActions.request());

