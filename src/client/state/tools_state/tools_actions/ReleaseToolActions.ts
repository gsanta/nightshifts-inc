import { ActionType, WatchableAction } from '../../ActionType';
import { Tool } from '../../../../game/tools/Tool';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { takeEvery, select } from 'redux-saga/effects';

class ReleaseToolActions implements WatchableAction<any> {
    public request(tool: Tool) {
        return {
            type: ActionType.RELEASE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.RELEASE_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: Tool}) {
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.DEACTIVATE_TOOL, action.tool);
    }
}

export default new ReleaseToolActions();
