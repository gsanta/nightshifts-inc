import { delay, put, takeEvery } from 'redux-saga/effects';
import BaseActions, { ActionType } from '../../ActionType';

class SetDataLoadedActions extends BaseActions {
    public *watch() {
        yield takeEvery(
            [
                ActionType.UPDATE_PASSWORD_SUCCESS,
                ActionType.UPDATE_USER_REQUEST
            ],
            this.setDataLoaded
        );
    }

    private *setDataLoaded() {
        yield delay(1000);
        yield put({ type: ActionType.DATA_LOADED });
    }
}

export default new SetDataLoadedActions();
