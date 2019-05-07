import { WatchableAction, ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { select, takeEvery } from 'redux-saga/effects';


class ShowRoomLabelsActions implements WatchableAction<any> {
    public request(showRoomLabels: boolean) {
        return {
            type: ActionType.DEBUG_SHOW_ROOM_LABELS,
            showRoomLabels
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_SHOW_ROOM_LABELS, this.activateTool);
    }

    private *activateTool({showRoomLabels}: Partial<DebugOptions>) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        if (showRoomLabels) {
            gameActionDispatcher.dispatch(GameActionType.SHOW_ROOM_NAMES, true);
        } else {
            gameActionDispatcher.dispatch(GameActionType.SHOW_ROOM_NAMES, false);
        }
    }
}

export default new ShowRoomLabelsActions();
