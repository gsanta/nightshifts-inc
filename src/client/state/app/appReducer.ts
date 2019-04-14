import { AppState, AppLoadingState } from './AppState';
import { ActionType } from '../ActionType';
import { UserQuery } from '../../query/user/UserQuery';
import { GameRequests } from '../game/GameRequests';
import { Tool } from '../../gui/components/dialogs/inventory/Tool';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';
import { combineReducers } from 'redux';
import { worldReducer } from './reducers/worldReducer';
import { toolsReducer } from './reducers/toolsReducer';
import { userReducer } from './reducers/userReducer';
import { appLoadingStateReducer } from './reducers/appLoadingStateReducer';
import { errorsReducer } from './reducers/errorsReducer';
import { gameActionDispatcherReducer } from './reducers/gameActionDispatcherReducer';

export default combineReducers({
    query: (state = {user: new UserQuery(), game: new GameRequests()}) => state,
    world: worldReducer,
    tools: toolsReducer,
    user: userReducer,
    appLoadingState: appLoadingStateReducer,
    errors: errorsReducer,
    gameActionDispatcher: gameActionDispatcherReducer
});
