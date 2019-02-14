import BaseActions, { ActionType } from '../../ActionType';
import { AppState } from '../../root/RootState';
import { select, call, put, delay, take } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { World } from '../../../../game/model/World';
import { WatchableAction } from '../../ActionType';

export const getGameRequests = (state: AppState) => state.query.game;
export const getUser = (state: AppState) => state.user;
export const getWorld = (state: AppState) => state.world;

class UpdateWorldActions extends BaseActions implements WatchableAction<World> {
    public request(world: World) {
        return {
            type: ActionType.UPDATE_GAME_REQUEST,
            world
        };
    }

    public *watch() {
        while (true) {
            const world = yield select(getWorld);

            if (world) {
                yield call(this.fetch);
            }
            yield delay(10000);
        }
    }

    private *fetch() {
        try {
            const gameRequest: GameRequests = yield select(getGameRequests);
            const user = yield select(getUser);
            const world = yield select(getWorld);
            yield call([gameRequest, gameRequest.update], user, world);

            yield put({type: ActionType.UPDATE_GAME_SUCCESS});
        } catch (error) {
            yield put({type: ActionType.UPDATE_GAME_FAILURE});
        }
    }
}

export default new UpdateWorldActions();
