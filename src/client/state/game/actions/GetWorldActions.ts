import { ActionType } from '../../../stores/ActionType';
import { AppState } from '../../AppState';
import { select, call, put, take } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';

export const getGameRequests = (state: AppState) => state.query.game;
export const getUser = (state: AppState) => state.user;

export const GetWorldActions = {
    request: () => ({
        type: ActionType.GET_WORLD_REQUEST
    }),

    fetch: function* fetch() {
        try {
            const gameRequest: GameRequests = yield select(getGameRequests);
            const user = yield select(getUser);
            const world = yield call([gameRequest, gameRequest.getWorldByUserId], user);

            yield put({type: ActionType.GET_WORLD_SUCCESS, world});
        } catch (error) {
            yield put({type: ActionType.GET_WORLD_FAILURE});
        }
    },

    watchOnce: function* watchOnce() {
        yield take(ActionType.GET_USER_SUCCESS);
        yield GetWorldActions.fetch();
    }
};
