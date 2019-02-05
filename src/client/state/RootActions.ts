import { put, takeEvery, all } from 'redux-saga/effects';
import { loadGameActionWatch } from './GameActions';
import { watchLoginFacebookRequest } from '../stores/UserActions';

export default function* rootSaga() {
    yield all([
        loadGameActionWatch(),
        watchLoginFacebookRequest()
    ]);
}
