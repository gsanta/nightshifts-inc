import BaseActions, { ActionType } from '../../ActionType';
import { AppState } from '../../root/RootState';
import { select, call, put, take, takeEvery } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { WatchableAction } from '../../ActionType';

export const getGameRequests = (state: AppState) => state.query.game;
export const getUser = (state: AppState) => state.user;

class GetWorldActions extends BaseActions implements WatchableAction<null> {
    public request() {
        return {
            type: ActionType.GET_WORLD_REQUEST
        };
    }

    public *watch() {
        yield takeEvery(ActionType.GET_USER_SUCCESS, this.fetch);
    }

    public *fetch() {
        try {
            const gameRequest: GameRequests = yield select(getGameRequests);
            const user = yield select(getUser);
            const world = yield call([gameRequest, gameRequest.getWorldByUserId], user);

            yield put({type: ActionType.GET_WORLD_SUCCESS, world});
        } catch (error) {
            yield put({type: ActionType.GET_WORLD_FAILURE});
        }
    }
}

export default new GetWorldActions();
