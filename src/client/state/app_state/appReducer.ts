import { combineReducers } from 'redux';
import { debugReducer } from '../debug_state/debugReducer';
import { WorldRequests } from '../world_state/WorldRequests';
import { UserRequests } from '../user_state/UserRequests';
import { appLoadingStateReducer } from './appLoadingStateReducer';
import { errorsReducer } from './errorsReducer';
import { gameActionDispatcherReducer } from '../world_state/gameActionDispatcherReducer';
import { toolsReducer } from '../tools_state/toolsReducer';
import { settingsReducer } from '../user_state/settingsReducer';
import { worldReducer } from '../world_state/worldReducer';
import { widgetReducer } from '../widget_state/widgetReducer';
import { AppState } from './AppState';

export default combineReducers<AppState>({
    query: (state = {user: new UserRequests(), game: new WorldRequests(null, null)}) => state,
    world: worldReducer,
    tools: toolsReducer,
    widgetInfo: widgetReducer,
    settings: settingsReducer,
    debugOptions: debugReducer,
    appLoadingState: appLoadingStateReducer,
    errors: errorsReducer,
    gameActionDispatcher: gameActionDispatcherReducer
});
