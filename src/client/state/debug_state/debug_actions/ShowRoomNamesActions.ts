import { WatchableAction, ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { ActiveRoomLightingActionHandler } from '../../../../game/actions/environment_actions/active_room_lightning_action/ActiveRoomLightingActionHandler';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { select, takeEvery } from 'redux-saga/effects';


class ShowRoomNamesActions implements WatchableAction<any> {
    public request(showRoomNames: boolean) {
        return {
            type: ActionType.DEBUG_SHOW_ROOM_NAMES,
            showRoomNames
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_SHOW_ROOM_NAMES, this.activateTool);
    }

    private *activateTool({showRoomNames}: Partial<DebugOptions>) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        if (showRoomNames) {
            gameActionDispatcher.dispatch(GameActionType.SHOW_ROOM_NAMES, true);
        } else {
            gameActionDispatcher.dispatch(GameActionType.SHOW_ROOM_NAMES, false);
        }
    }
}

export default new ShowRoomNamesActions();
