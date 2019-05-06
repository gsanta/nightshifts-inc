import { ActionType } from '../../ActionType';
import { User } from '../user_model/User';
import { PasswordUpdateDto } from '../user_model/PasswordUpdateDto';
import { ErrorMessage } from '../../../components/miscellaneous/ErrorMessage';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';
import { takeEvery, select, call, put } from 'redux-saga/effects';

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
        yield takeEvery<any>(ActionType.UPDATE_PASSWORD_REQUEST, this.fetch);
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
