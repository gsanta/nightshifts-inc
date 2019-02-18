import { ActionType } from '../../ActionType';
import { AppState } from '../../root/RootState';
import { select, call, put, take, takeEvery } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { WatchableAction } from '../../ActionType';
import GameSelections from '../GameSelections';
import UserSelections from '../../user/UserSelections';

class GetWorldActions implements WatchableAction<null> {
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
            const gameRequest: GameRequests = yield select(GameSelections.getGameRequests);
            const user = yield select(UserSelections.getUser);
            const world = yield call([gameRequest, gameRequest.getWorldByUserId], user);

            yield put({type: ActionType.GET_WORLD_SUCCESS, world});
        } catch (error) {
            yield put({type: ActionType.GET_WORLD_FAILURE});
        }
    }
}

export default new GetWorldActions();
