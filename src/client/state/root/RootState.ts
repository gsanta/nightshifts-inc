import { UserQuery } from '../../query/user/UserQuery';
import { User } from '../user/User';
import { ErrorMessage } from '../../gui/ErrorMessage';
import { GameRequests } from '../game/GameRequests';
import { JsonWorldSchema } from '../../../game/io/json_world_io/import/JsonWorldSchema';
import { Tool } from '../../gui/components/dialogs/inventory/Tool';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';

export type AppLoadingState = 'loading' | 'ready';
export type DataLoadingState = 'loading' | 'recently_loaded' | 'loaded';

export interface AppState {
    config: {
        baseUrl: string;
    };
    query: {
        user: UserQuery;
        game: GameRequests;
    };
    world: JsonWorldSchema;
    user: User;
    tools: Tool[];

    appLoadingState: AppLoadingState;
    dataLoadingState: DataLoadingState;
    errors: ErrorMessage[];

    gameActionDispatcher: ActionDispatcher;
}
