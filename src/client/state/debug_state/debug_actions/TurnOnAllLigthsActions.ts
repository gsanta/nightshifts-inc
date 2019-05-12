import { WatchableAction, ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { ActiveRoomLightingActionHandler } from '../../../../game/actions/environment_actions/active_room_lightning_action/ActiveRoomLightingActionHandler';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { select, takeEvery } from 'redux-saga/effects';


class TurnOnAllLightsActions implements WatchableAction<any> {
    public request(activate: boolean) {
        return {
            type: ActionType.DEBUG_TURN_ON_ALL_LIGHTS,
            areAllLightsTurnedOn: activate
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_TURN_ON_ALL_LIGHTS, this.activateTool);
    }

    private *activateTool({areAllLightsTurnedOn}: Partial<DebugOptions>) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        if (areAllLightsTurnedOn) {
            gameActionDispatcher.dispatch(GameActionType.TURN_ON_ALL_LIGHTS);
            // gameActionDispatcher.unregisterActionHandler(ActiveRoomLightingActionHandler.getInstance());
        } else {
            // gameActionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
            gameActionDispatcher.dispatch(GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS);
        }
    }
}

export default new TurnOnAllLightsActions();
