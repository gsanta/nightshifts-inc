import BaseActions, { ActionType, WatchableAction } from '../../ActionType';
import { select, put, takeEvery } from 'redux-saga/effects';

class SignoutActions extends BaseActions implements WatchableAction<null> {
    public request() {
        return {
            type: ActionType.SIGNOUT_REQUEST
        };
    }

    public *watch() {
        yield takeEvery(ActionType.SIGNOUT_REQUEST, this.fetch);
    }

    private *fetch() {
        const userQuery = yield select(this.getUserQuery);

        userQuery.signout();
        yield put({type: ActionType.SIGNOUT_SUCCESS});
    }
}

export default new SignoutActions();
