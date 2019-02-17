import { ActionType, WatchableAction } from '../../ActionType';
import { UserQuery } from '../../../query/user/UserQuery';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import BaseActions from '../../ActionType';

class GetUserActions extends BaseActions implements WatchableAction<null> {
    public request() {
        return {
            type: ActionType.GET_USER_REQUEST
        };
    }

    public *fetch() {
        try {
            const userQuery: UserQuery = yield select(BaseActions.getUserQuery);
            const user = yield call([userQuery, userQuery.fetchUser]);

            yield put({type: ActionType.GET_USER_SUCCESS, user});
        } catch (error) {
            yield put({type: ActionType.GET_USER_FAILURE});
        }
    }

    public *watch() {
        yield takeEvery(ActionType.GET_USER_REQUEST, this.fetch);
    }
}

export default new GetUserActions();
