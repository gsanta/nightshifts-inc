import { UserStore } from '../UserStore';
import { TokenHandler } from '../../query/TokenHandler';
import { User } from '../User';

export class AppActions {
    private userStore: UserStore;
    private tokenHandler: TokenHandler;

    constructor(userStore: UserStore, tokenHandler: TokenHandler) {
        this.userStore = userStore;
        this.tokenHandler = tokenHandler;
    }

    public signout() {
        this.tokenHandler.deleteToken();
        this.userStore.setModel(User.NULL_USER_MODEL);
    }

    public clearErrors() {
        if (this.userStore.errors.length > 0) {
            this.userStore.setErrors([]);
        }
    }
}
