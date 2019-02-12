import { ActionType } from '../../stores/ActionType';
import { select, put, takeEvery } from 'redux-saga/effects';
import { getUserQuery } from './UserActions';


export const SignoutActions = {
    request: () => ({
        type: ActionType.SIGNOUT_REQUEST
    }),

    fetch: function* fetch() {
        const userQuery = yield select(getUserQuery);

        userQuery.signout();
        yield put({type: ActionType.SIGNOUT_SUCCESS});
    },

    watch: function* watch() {
        yield takeEvery(ActionType.SIGNOUT_REQUEST, SignoutActions.fetch);
    }
};
