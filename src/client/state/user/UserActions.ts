import { ActionType } from '../../stores/ActionType';
import { takeEvery, put } from 'redux-saga/effects';
import { AppState } from '../AppState';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getUserQuery = (state: AppState) => state.query.user;

export const clearErrors = () => {
    return {
        type: ActionType.CLEAR_ERRORS
    };
};

export function* dataLoaded() {
    yield delay(1000);
    yield put({ type: ActionType.DATA_LOADED });
}

export function* watchDataLoadedState() {
    yield takeEvery(
        [
            ActionType.UPDATE_PASSWORD_SUCCESS,
            ActionType.UPDATE_USER_REQUEST
        ],
        dataLoaded
    );
}
