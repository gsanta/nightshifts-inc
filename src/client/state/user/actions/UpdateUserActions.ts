import { ActionType } from '../../ActionType';
import { User } from '../User';
import { put, select, call, takeEvery } from 'redux-saga/effects';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';

class UpdateUserActions implements WatchableAction<User> {
    public request(user: User) {
        return {
            type: ActionType.UPDATE_USER_REQUEST,
            user
        };
    }

    public *watch() {
        yield takeEvery(ActionType.UPDATE_USER_REQUEST, this.fetch);
    }

    private *fetch(action: {user: User}) {
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            const updatedUser = yield call([userQuery, userQuery.updateUser], action.user);
            yield put({type: ActionType.UPDATE_USER_SUCCESS, user: updatedUser});
        } catch (error) {
            yield put({type: ActionType.UPDATE_GAME_FAILURE});
        }
    }
}

export default new UpdateUserActions();
