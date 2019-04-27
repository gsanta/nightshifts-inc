import { WatchableAction, ActionType } from '../../../ActionType';
import { takeEvery, select } from 'redux-saga/effects';
import { Tool } from '../../../../../game/tools/Tool';
import { ActionDispatcher } from '../../../../../game/actions/ActionDispatcher';
import GameSelections from '../../GameSelections';
import { GameActionType } from '../../../../../game/actions/GameActionType';


class TurnOnAllLightsActions implements WatchableAction<any> {
    public request(activate: boolean) {
        return {
            type: ActionType.DEBUG_TURN_ON_ALL_LIGHTS,
            activate
        };
    }

    public *watch() {
        yield takeEvery(ActionType.DEBUG_TURN_ON_ALL_LIGHTS, this.activateTool);
    }

    private *activateTool() {
        const gameActionDispatcher: ActionDispatcher = yield select(GameSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.TURN_ON_ALL_LIGHTS);
    }
}

export default new TurnOnAllLightsActions();
