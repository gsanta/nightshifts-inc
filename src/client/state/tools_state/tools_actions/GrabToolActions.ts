import { ActionType, WatchableAction } from '../../ActionType';
import { ToolIcon } from '../../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { select, takeEvery } from 'redux-saga/effects';

class GrabToolActions implements WatchableAction<any> {
    public request(tool: ToolIcon) {

        return {
            type: ActionType.GRAB_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.GRAB_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: ToolIcon}) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.ACTIVATE_TOOL, action.tool);
    }
}

export default new GrabToolActions();
