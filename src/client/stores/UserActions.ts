import { UserStore } from './UserStore';
import { UserQuery } from '../query/user/UserQuery';
import { AppStore } from './app/AppStore';
import { AppModel } from './app/AppModel';
import { User } from './User';

export class UserActions {
    private userStore: UserStore;
    private appStore: AppStore;
    private userQuery: UserQuery;

    constructor(userStore: UserStore, appStore: AppStore, userQuery: UserQuery) {
        this.userStore = userStore;
        this.userQuery = userQuery;
        this.appStore = appStore;
    }

    public loadUser() {
        this.userQuery.fetchUser()
            .then(user => {
                this.userStore.setModel(user);
            })
            .finally(() => {
                const appModel = new AppModel();
                appModel.setAppState('ready');
                this.appStore.setModel(appModel);
            });
    }

    public updateUser(user: User) {
        this.userQuery.updateUser(user)
            .then(updatedUser => {
                this.userStore.setModel(updatedUser);
            });
    }

    public signOut() {
        this.userStore.setModel(null);
    }

    public fetchUser() {}
}

