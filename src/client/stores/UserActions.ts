import { UserStore } from './UserStore';
import { UserQuery } from '../query/user/UserQuery';

export class UserActions {
    private userStore: UserStore;
    private userQuery: UserQuery;

    constructor(userStore: UserStore, userQuery: UserQuery) {
        this.userStore = userStore;
        this.userQuery = userQuery;
    }

    public signOut() {
        this.userStore.setModel(null);
    }
}

