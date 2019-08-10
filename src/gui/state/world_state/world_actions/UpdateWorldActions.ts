import { ActionType } from '../../ActionType';
import { select, call, put, delay, take } from 'redux-saga/effects';
import { WorldRequests } from '../WorldRequests';
import { World } from '../../../../game/model/game_objects/World';
import { WatchableAction } from '../../ActionType';
import WorldSelections from './WorldSelections';
import UserSelections from '../../../../gui/state/settings_state/UserSelections';

class UpdateWorldActions implements WatchableAction<World> {
    public request(world: World) {
        return {
            type: ActionType.UPDATE_GAME_REQUEST,
            world
        };
    }

    public *watch() {
        while (true) {
            const world = yield select(WorldSelections.getWorld);

            if (world) {
                yield call(this.fetch);
            }
            yield delay(10000);
        }
    }

    private *fetch() {
        try {
            const gameRequest: WorldRequests = yield select(WorldSelections.getGameRequests);
            const user = yield select(UserSelections.getUser);
            const world = yield select(WorldSelections.getWorld);
            yield call([gameRequest, gameRequest.update], user, world);

            yield put({type: ActionType.UPDATE_GAME_SUCCESS});
        } catch (error) {
            yield put({type: ActionType.UPDATE_GAME_FAILURE});
        }
    }
}

export default new UpdateWorldActions();
