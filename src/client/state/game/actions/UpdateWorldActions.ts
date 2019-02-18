import { ActionType } from '../../ActionType';
import { select, call, put, delay, take } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { World } from '../../../../game/model/World';
import { WatchableAction } from '../../ActionType';
import GameSelections from '../GameSelections';
import UserSelections from '../../user/UserSelections';

class UpdateWorldActions implements WatchableAction<World> {
    public request(world: World) {
        return {
            type: ActionType.UPDATE_GAME_REQUEST,
            world
        };
    }

    public *watch() {
        while (true) {
            const world = yield select(GameSelections.getWorld);

            if (world) {
                yield call(this.fetch);
            }
            yield delay(10000);
        }
    }

    private *fetch() {
        try {
            const gameRequest: GameRequests = yield select(GameSelections.getGameRequests);
            const user = yield select(UserSelections.getUser);
            const world = yield select(GameSelections.getWorld);
            yield call([gameRequest, gameRequest.update], user, world);

            yield put({type: ActionType.UPDATE_GAME_SUCCESS});
        } catch (error) {
            yield put({type: ActionType.UPDATE_GAME_FAILURE});
        }
    }
}

export default new UpdateWorldActions();
