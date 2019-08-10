import { World } from '../../../game/model/game_objects/World';
import { DebugOptions } from '../../../gui/components/dialogs/debug/DebugOptions';
import { ToolIcon } from '../../../gui/components/dialogs/inventory/tools_icons/ToolIcon';
import { ErrorMessage } from '../../../gui/components/miscellaneous/ErrorMessage';
import { ServiceFacade } from '../../../game/services/ServiceFacade';
import { UserRequests } from '../settings_state/UserRequests';
import { ApplicationSettings } from '../settings_state/model/ApplicationSettings';
import { WorldRequests } from '../world_state/WorldRequests';

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
