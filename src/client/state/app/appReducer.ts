import { combineReducers } from 'redux';
import { debugReducer } from '../debug_state/debugReducer';
import { GameRequests } from '../game/GameRequests';
import { UserRequests } from '../user/UserRequests';
import { appLoadingStateReducer } from './reducers/appLoadingStateReducer';
import { errorsReducer } from './reducers/errorsReducer';
import { gameActionDispatcherReducer } from './reducers/gameActionDispatcherReducer';
import { toolsReducer } from './reducers/toolsReducer';
import { userReducer } from './reducers/userReducer';
import { worldReducer } from './reducers/worldReducer';

export default combineReducers({
    query: (state = {user: new UserRequests(), game: new GameRequests(null, null)}) => state,
    world: worldReducer,
    tools: toolsReducer,
    user: userReducer,
    debugOptions: debugReducer,
    appLoadingState: appLoadingStateReducer,
    errors: errorsReducer,
    gameActionDispatcher: gameActionDispatcherReducer
});
