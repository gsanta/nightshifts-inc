import { takeEvery, put } from 'redux-saga/effects';


export function* loadGame() {
    yield put({ type: 'GET_GAME_SUCCESS' });
}

export const loadGameRequest = () => {
    return {
        type: 'GET_GAME_REQUEST'
    };
};

export function* loadGameActionWatch() {
    yield takeEvery('GET_GAME_REQUEST', loadGame);
}
