import { World } from '../../game/model/World';
import { UserQuery } from '../query/user/UserQuery';
import { User } from '../stores/User';

export type AppLoadingState = 'loading' | 'ready';

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
}
