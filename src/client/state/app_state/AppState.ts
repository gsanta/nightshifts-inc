import { UserRequests } from '../user_state/UserRequests';
import { User } from '../user_state/user_model/User';
import { ErrorMessage } from '../../components/miscellaneous/ErrorMessage';
import { WorldRequests } from '../world_state/WorldRequests';
import { JsonWorldSchema } from '../../../game/world/world_import/JsonWorldSchema';
import { Tool } from '../../../game/tools/Tool';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';
import { DebugOptions } from '../../components/dialogs/debug_dialog/DebugOptions';

export type AppLoadingState = 'loading' | 'ready';
export type DataLoadingState = 'loading' | 'recently_loaded' | 'loaded';

export interface AppState {
    query: {
        user: UserRequests;
        game: WorldRequests;
    };
    world: JsonWorldSchema;
    user: User;
    tools: Tool[];

    debugOptions: DebugOptions;
    appLoadingState: AppLoadingState;
    errors: ErrorMessage[];

    gameActionDispatcher: ActionDispatcher;
}
