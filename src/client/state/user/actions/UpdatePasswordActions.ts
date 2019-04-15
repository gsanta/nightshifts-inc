import { ActionType } from '../../ActionType';
import { User } from '../User';
import { PasswordUpdateDto } from '../dto/PasswordUpdateDto';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { ErrorMessage } from '../../../gui/ErrorMessage';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';

export interface UpdatePasswordRequestPayload {
    user: User;
    newPassword: string;
    oldPassword: string;
}

class UpdatePasswordActions implements WatchableAction<UpdatePasswordRequestPayload> {
    public request(payload: UpdatePasswordRequestPayload) {
        return {
            type: ActionType.UPDATE_PASSWORD_REQUEST,
            newPassword: payload.newPassword,
            oldPassword: payload.oldPassword,
            user: payload.user
        };
    }

    public *watch() {
        yield takeEvery(ActionType.UPDATE_PASSWORD_REQUEST, this.fetch);
    }

    private *fetch(action: UpdatePasswordRequestPayload) {
        const passwordUpdateDto: PasswordUpdateDto = {
            id: action.user.id,
            oldPassword: action.oldPassword,
            newPassword: action.newPassword
        };
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            yield call([userQuery, userQuery.updatePassword], passwordUpdateDto);
            yield put({ type: ActionType.UPDATE_PASSWORD_SUCCESS});
        } catch (e) {
            yield put({type: ActionType.UPDATE_PASSWORD_FAILURE, errors: [<ErrorMessage> e.response.data]});
        }
    }
}

export default new UpdatePasswordActions();


// export const UpdatePasswordActions = {
//     request: (user: User, newPassword: string, oldPassword: string) => ({
//         type: ActionType.UPDATE_PASSWORD_REQUEST,
//         newPassword,
//         oldPassword,
//         user
//     }),

//     fetch: function* fetch(action: { user: User, newPassword: string, oldPassword: string }) {
//         const passwordUpdateDto: PasswordUpdateDto = {
//             id: action.user.id,
//             oldPassword: action.oldPassword,
//             newPassword: action.newPassword
//         };
//         try {
//             const userQuery = yield select(getUserQuery);

//             yield call([userQuery, userQuery.updatePassword], passwordUpdateDto);
//             yield put({ type: ActionType.UPDATE_PASSWORD_SUCCESS});
//         } catch (e) {
//             yield put({type: ActionType.UPDATE_PASSWORD_FAILURE, errors: [<ErrorMessage> e.response.data]});
//         }
//     },

//     watch: function* watch() {
//         yield takeEvery(ActionType.UPDATE_PASSWORD_REQUEST, UpdatePasswordActions.fetch);
//     }
// };
