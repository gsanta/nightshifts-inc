import { ActionType } from '../../ActionType';
import { User } from '../user_model/User';

export interface LoginRequestPayload {
    email: string;
    password: string;
}

const TEMPORARY_USER = User.fromDto({
    id: null,
    email: 'Temporary user',
    authStrategy: 'unauthenticated'
});

class LoginWithTemporaryUserActions {
    public request() {
        return {
            type: ActionType.LOGIN_WITH_TEMPORARY_USER_REQUEST,
            user: TEMPORARY_USER
        };
    }
}

export default new LoginWithTemporaryUserActions();
