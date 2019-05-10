import { ActionType, WatchableAction } from '../../ActionType';
import { ToolIcon } from '../../../../game/tools/ToolIcon';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { takeEvery, select } from 'redux-saga/effects';

class ReleaseToolActions implements WatchableAction<any> {
    public request(tool: ToolIcon) {
        return {
            type: ActionType.RELEASE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.RELEASE_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: ToolIcon}) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.DEACTIVATE_TOOL, action.tool);
    }
}

export default new ReleaseToolActions();
