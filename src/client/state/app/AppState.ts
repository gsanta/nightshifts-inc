import { UserRequests } from '../user/UserRequests';
import { User } from '../user/User';
import { ErrorMessage } from '../../components/miscellaneous/ErrorMessage';
import { GameRequests } from '../game/GameRequests';
import { JsonWorldSchema } from '../../../game/world/world_import/JsonWorldSchema';
import { Tool } from '../../../game/tools/Tool';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';

export type AppLoadingState = 'loading' | 'ready';
export type DataLoadingState = 'loading' | 'recently_loaded' | 'loaded';

export interface AppState {
    query: {
        user: UserRequests;
        game: GameRequests;
    };
    world: JsonWorldSchema;
    user: User;
    tools: Tool[];

    appLoadingState: AppLoadingState;
    errors: ErrorMessage[];

    gameActionDispatcher: ActionDispatcher;
}
