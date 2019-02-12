import { ActionType } from '../../stores/ActionType';
import { UserQuery } from '../../query/user/UserQuery';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';


export const GetUserActions = {
    request: () => ({
        type: ActionType.GET_USER_REQUEST
    }),

    fetch: function* fetch() {
        try {
            const userQuery: UserQuery = yield select(getUserQuery);
            const user = yield call([userQuery, userQuery.fetchUser]);

            yield put({type: ActionType.GET_USER_SUCCESS, user});
        } catch (error) {
            yield put({type: ActionType.GET_USER_FAILURE});
        }
    },

    watch: function* watch() {
        yield takeEvery(ActionType.GET_USER_REQUEST, GetUserActions.fetch);
    }
};
