import { takeEvery } from 'redux-saga/effects';
import { ToolIcon } from '../../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionType, WatchableAction } from '../../ActionType';

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
        // const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        // gameActionDispatcher.dispatch(GameActionType.ACTIVATE_TOOL, action.tool);
    }
}

export default new GrabToolActions();
