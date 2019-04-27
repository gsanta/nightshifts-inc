import { ActionType } from '../../ActionType';
import { AppState } from '../../app_state/AppState';
import { select, call, put, take, takeEvery } from 'redux-saga/effects';
import { WorldRequests } from '../WorldRequests';
import { WatchableAction } from '../../ActionType';
import WorldSelections from './WorldSelections';
import UserSelections from '../../user_state/UserSelections';

class GetWorldActions implements WatchableAction<null> {
    public request() {
        return {
            type: ActionType.GET_WORLD_REQUEST
        };
    }

    public *watch() {
        yield takeEvery(ActionType.GET_WORLD_SUCCESS, this.fetch);
    }

    public *fetch() {
        try {
            const gameRequest: WorldRequests = yield select(WorldSelections.getGameRequests);
            const user = yield select(UserSelections.getUser);
            const world = yield call([gameRequest, gameRequest.getWorldByUserId], user);

            yield put({type: ActionType.GET_WORLD_SUCCESS, world});
        } catch (error) {
            yield put({type: ActionType.GET_WORLD_FAILURE});
        }
    }
}

export default new GetWorldActions();
