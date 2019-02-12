import { ActionType } from '../../stores/ActionType';
import { User } from '../../stores/User';
import { PasswordUpdateDto } from '../../query/user/PasswordUpdateDto';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';
import { ErrorMessage } from '../../gui/ErrorMessage';


export const UpdatePasswordActions = {
    request: (user: User, newPassword: string, oldPassword: string) => ({
        type: ActionType.UPDATE_PASSWORD_REQUEST,
        newPassword,
        oldPassword,
        user
    }),

    fetch: function* fetch(action: { user: User, newPassword: string, oldPassword: string }) {
        const passwordUpdateDto: PasswordUpdateDto = {
            id: action.user.id,
            oldPassword: action.oldPassword,
            newPassword: action.newPassword
        };
        try {
            const userQuery = yield select(getUserQuery);

            yield call([userQuery, userQuery.updatePassword], passwordUpdateDto);
            yield put({ type: ActionType.UPDATE_PASSWORD_SUCCESS});
        } catch (e) {
            yield put({type: ActionType.UPDATE_PASSWORD_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    },

    watch: function* watch() {
        yield takeEvery(ActionType.UPDATE_PASSWORD_REQUEST, UpdatePasswordActions.fetch);
    }
};
