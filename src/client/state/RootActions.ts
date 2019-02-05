import { put, takeEvery, all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch()
    ]);
}
