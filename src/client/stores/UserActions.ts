import { UserStore } from './UserStore';
import { UserQuery } from '../query/user/UserQuery';
import { AppStore } from './app/AppStore';
import { AppModel } from './app/AppModel';
import { User } from './User';
import { PasswordUpdateDto } from '../query/user/PasswordUpdateDto';
import { ActionType } from './ActionType';
import { ErrorMessage } from '../gui/ErrorMessage';

import { takeEvery, put } from 'redux-saga/effects';


export function* loadUser() {
    try {
        const user = yield call(gitHubApi, payload); // Make Api call to Github api with the username
        yield put({type: 'LOAD_USER_SUCCESS', user}); // Yields effect to the reducer specifying the action type and optional parameter
    } catch (error) {
        throw error;
    }
    this.userQuery.fetchUser()
    .then(user => {
        this.userStore.setModel(user);
    })
    .finally(() => {
        const appModel: AppModel = {...this.appStore.getModel(), appState: 'ready'};
        this.appStore.setModel(appModel);
    });
    yield put({ type: ActionType.GET_GAME_SUCCESS });
}

export const loadUserRequest = () => {
    return {
        type: ActionType.GET_USER_REQUEST
    };
};

export function* watchGetUserRequest() {
    yield takeEvery(ActionType.GET_USER_REQUEST, loadUser);
}


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
                const appModel: AppModel = {...this.appStore.getModel(), appState: 'ready'};
                this.appStore.setModel(appModel);
            });
    }

    public updateUser(user: User) {
        const appModel: AppModel = {...this.appStore.getModel(), dataLoadingState: 'loading', lastActiontType: ActionType.UPDATE_USER};
        this.appStore.setModel(appModel);

        this.userQuery.updateUser(user)
            .then(updatedUser => {
                this.userStore.setModel(updatedUser);
                this.appStore.setModel({...this.appStore.getModel(), dataLoadingState: 'recently_loaded'});
                this.setLoadedStateAfterDelay();
            })
            .catch((e) => {
                this.userStore.setErrors([<ErrorMessage> e.response.data]);
                this.appStore.setModel({...this.appStore.getModel(), dataLoadingState: 'loaded'});
            });
    }

    public updatePassword(passwordDto: PasswordUpdateDto) {
        const appModel: AppModel = {...this.appStore.getModel(), dataLoadingState: 'loading', lastActiontType: ActionType.UPDATE_PASSWORD};
        this.appStore.setModel(appModel);

        this.userQuery.updatePassword(passwordDto)
        .then(() => {
            this.appStore.setModel({...this.appStore.getModel(), dataLoadingState: 'recently_loaded'});
            this.setLoadedStateAfterDelay();
        })
        .catch((e) => {
            this.userStore.setErrors([<ErrorMessage> e.response.data]);
            this.appStore.setModel({...this.appStore.getModel(), dataLoadingState: 'loaded'});
        });
    }

    public signOut() {
        this.userStore.setModel(null);
    }

    public loginFacebook(accessToken: string) {
        this.userQuery.loginFacebook(accessToken)
            .then((user: User) => {
                this.userStore.setModel(user);
            })
            .catch((e) => {
                this.userStore.setErrors([<ErrorMessage> e.response.data]);
            });
    }

    public login(email: string, password: string) {
        this.userQuery.login({ email: email, password: password})
        .then((user: User) => {
            this.userStore.setModel(user);
        })
        .catch((e) => {
            this.userStore.setErrors([<ErrorMessage> e.response.data]);
        });
    }

    public signup(email: string, password: string) {
        this.userQuery.signup({ email, password })
            .then((user: User) => {
                this.userStore.setModel(user);
            })
            .catch((e) => {
                this.userStore.setErrors([<ErrorMessage> e.response.data]);
            });
    }

    private setLoadedStateAfterDelay() {
        setTimeout(
            () => {
                this.appStore.setModel({...this.appStore.getModel(), dataLoadingState: 'loaded'});
            },
            1000
        );
    }
}

