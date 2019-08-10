import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appReducer';
import { all } from 'redux-saga/effects';
import TurnOnAllLigthsActions from '../debug_state/debug_actions/TurnOnAllLigthsActions';
import ShowRoomLabelsActions from '../debug_state/debug_actions/ShowRoomLabelsActions';
import ShowBoundingBoxesAction from '../debug_state/debug_actions/ShowBoundingBoxesActions';
import LoginFacebookActions from '../settings_state/actions/LoginFacebookActions';
import GetUserActions from '../settings_state/actions/GetUserActions';
import SignoutActions from '../settings_state/actions/SignoutActions';
import LoginActions from '../settings_state/actions/LoginActions';
import SignupActions from '../settings_state/actions/SignupActions';
import UpdatePasswordActions from '../settings_state/actions/UpdatePasswordActions';
import UpdateSettingsActions from '../settings_state/actions/UpdateSettingsActions';
import ActivateToolActions from '../tools_state/tools_actions/ActivateToolActions';
import DeactivateToolActions from '../tools_state/tools_actions/DeactivateToolActions';
import ReleaseToolActions from '../tools_state/tools_actions/ReleaseToolActions';
import GetWorldActions from '../world_state/world_actions/GetWorldActions';

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
        UpdateSettingsActions.watch(),
        // UpdateWorldActions.watch(),
        GetWorldActions.watch(),
        TurnOnAllLigthsActions.watch(),
        ShowRoomLabelsActions.watch(),
        ShowBoundingBoxesAction.watch(),
        ActivateToolActions.watch(),
        DeactivateToolActions.watch(),
        ReleaseToolActions.watch()
    ]);
});

AppStore.dispatch(GetUserActions.request());


