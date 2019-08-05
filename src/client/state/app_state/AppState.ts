import { World } from '../../../game/model/game_objects/World';
import { DebugOptions } from '../../components/dialogs/debug_dialog/DebugOptions';
import { ToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ErrorMessage } from '../../components/miscellaneous/ErrorMessage';
import { ApplicationSettings } from '../settings_state/model/ApplicationSettings';
import { UserRequests } from '../settings_state/UserRequests';
import { WorldRequests } from '../world_state/WorldRequests';
import { ServiceFacade } from '../../../game/services/ServiceFacade';

export type AppLoadingState = 'loading' | 'ready';
export type DataLoadingState = 'loading' | 'recently_loaded' | 'loaded';

export interface AppState {
    query: {
        user: UserRequests;
        game: WorldRequests;
    };
    world: World;
    settings: ApplicationSettings;
    tools: ToolIcon[];

    widgetInfo: number;

    debugOptions: DebugOptions;
    appLoadingState: AppLoadingState;
    errors: ErrorMessage[];

    services: ServiceFacade;
}
