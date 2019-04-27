import { WatchableAction, ActionType } from '../../ActionType';
import { takeEvery, select } from 'redux-saga/effects';
import { Tool } from '../../../../game/tools/Tool';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { ActiveRoomLightingActionHandler } from '../../../../game/actions/handlers/ActiveRoomLightingActionHandler';
import { gameActionDispatcherReducer } from '../../world_state/gameActionDispatcherReducer';


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

    private *activateTool({activate}: {activate: boolean}) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        if (activate) {
            gameActionDispatcher.dispatch(GameActionType.TURN_ON_ALL_LIGHTS);
            // gameActionDispatcher.dispatch(GameActionType.TURN_ON_ALL_LIGHTS);
            gameActionDispatcher.unregisterActionHandler(ActiveRoomLightingActionHandler.getInstance());
        } else {
            gameActionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
            gameActionDispatcher.dispatch(GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS);
        }
    }
}

export default new TurnOnAllLightsActions();
