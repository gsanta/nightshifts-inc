import { combineReducers } from 'redux';
import { debugReducer } from '../debug_state/debugReducer';
import { appLoadingStateReducer } from './appLoadingStateReducer';
import { errorsReducer } from './errorsReducer';
import { AppState } from './AppState';
import { UserRequests } from '../settings_state/UserRequests';
import { widgetReducer } from '../widget_state/widgetReducer';
import { settingsReducer } from '../settings_state/settingsReducer';
import { toolsReducer } from '../tools_state/toolsReducer';
import { WorldRequests } from '../world_state/WorldRequests';
import { worldReducer } from '../world_state/worldReducer';
import { gameServicesReducer } from '../world_state/gameServicesReducer';

export default combineReducers<AppState>({
    query: (state = {user: new UserRequests(), game: new WorldRequests(null, null)}) => state,
    world: worldReducer,
    tools: toolsReducer,
    widgetInfo: widgetReducer,
    settings: settingsReducer,
    debugOptions: debugReducer,
    appLoadingState: appLoadingStateReducer,
    errors: errorsReducer,
    services: gameServicesReducer
});
