import { UserQuery } from '../query/user/UserQuery';
import { User } from '../stores/User';
import { ErrorMessage } from '../gui/ErrorMessage';
import { GameRequests } from './game/GameRequests';
import { JsonWorldSchema } from '../../game/io/json_world_io/import/JsonWorldSchema';

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

    appLoadingState: AppLoadingState;
    dataLoadingState: DataLoadingState;
    errors: ErrorMessage[];
}
