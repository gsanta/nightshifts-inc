import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appReducer';
import GetUserActions from '../settings_state/actions/GetUserActions';
import { all } from 'redux-saga/effects';
import GetWorldActions from '../world_state/world_actions/GetWorldActions';
import LoginFacebookActions from '../settings_state/actions/LoginFacebookActions';
import SignoutActions from '../settings_state/actions/SignoutActions';
import LoginActions from '../settings_state/actions/LoginActions';
import SignupActions from '../settings_state/actions/SignupActions';
import UpdatePasswordActions from '../settings_state/actions/UpdatePasswordActions';
import UpdateSettingsActions from '../settings_state/actions/UpdateSettingsActions';
import TurnOnAllLigthsActions from '../debug_state/debug_actions/TurnOnAllLigthsActions';
import ShowRoomLabelsActions from '../debug_state/debug_actions/ShowRoomLabelsActions';
import ShowBoundingBoxesAction from '../debug_state/debug_actions/ShowBoundingBoxesActions';
import ActivateToolActions from '../tools_state/tools_actions/ActivateToolActions';
import DeactivateToolActions from '../tools_state/tools_actions/DeactivateToolActions';
import ReleaseToolActions from '../tools_state/tools_actions/ReleaseToolActions';
import i18n from 'i18next';

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


