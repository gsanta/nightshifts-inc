import { World } from '../../game/model/World';
import { UserQuery } from '../query/user/UserQuery';
import { User } from '../stores/User';
import { ErrorMessage } from '../gui/ErrorMessage';

export type AppLoadingState = 'loading' | 'ready';
export type DataLoadingState = 'loading' | 'recently_loaded' | 'loaded';

export interface AppState {
    config: {
        baseUrl: string;
    };
    query: {
        user: UserQuery;
    };
    world: World;
    user: User;

    appLoadingState: AppLoadingState;
    dataLoadingState: DataLoadingState;
    errors: ErrorMessage[];
}
