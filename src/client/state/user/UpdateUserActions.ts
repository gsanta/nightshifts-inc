import { ActionType } from '../../stores/ActionType';
import { User } from '../../stores/User';
import { put, select, call, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';

export const UpdateUserActions = {
    request: (user: User) => ({
        type: ActionType.UPDATE_USER_REQUEST,
        user
    }),

    fetch: function* fetch(action: {user: User}) {
        try {
            const userQuery = yield select(getUserQuery);

            const updatedUser = yield call([userQuery, userQuery.updateUser], action.user);
            yield put({type: ActionType.UPDATE_USER_SUCCESS, user: updatedUser});
        } catch (error) {
            yield put({type: ActionType.UPDATE_GAME_FAILURE});
        }
    },

    watch: function* watch() {
        yield takeEvery(ActionType.UPDATE_USER_REQUEST, UpdateUserActions.fetch);
    }
};
