import { UserStore } from '../UserStore';
import { TokenHandler } from '../../query/TokenHandler';
import { UserModel } from '../UserModel';

export class AppActions {
    private userStore: UserStore;
    private tokenHandler: TokenHandler;

    constructor(userStore: UserStore, tokenHandler: TokenHandler) {
        this.userStore = userStore;
        this.tokenHandler = tokenHandler;
    }

    signout() {
        this.tokenHandler.deleteToken();
        this.userStore.setModel(UserModel.NULL_USER_MODEL);
    }
}
