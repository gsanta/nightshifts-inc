import { User } from '../model/User';
import { ErrorMessage } from '../components/miscellaneous/ErrorMessage';
import { ControllerFacade } from './ControllerFacade';


export class UserController {
    user: User;
    errors: ErrorMessage[] = [];

    readonly controllers: ControllerFacade;

    constructor(controllers: ControllerFacade) {
        this.controllers = controllers;
    }

    login(userName: string, password: string) {
        throw new Error('Not implementd');
    }

    logout() {
        this.user = null;
        this.errors = [];
        this.controllers.renderController.render();
    }

    loginFacebook(accessToken: string) {
        throw new Error('Not implementd');
    }

    loginTemporaryUser() {
        this.user = User.fromDto({
            id: null,
            email: 'Temporary user',
            authStrategy: 'unauthenticated'
        });

        this.controllers.renderController.render();
    }

    signup(email: string, password: string) {
        throw new Error('Not implementd');
    }

    updatePassword(user: User, oldPassword: string, newPassword: string) {
        throw new Error('Not implementd');
    }
}
