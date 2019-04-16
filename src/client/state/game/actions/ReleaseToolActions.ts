import { ActionType, WatchableAction } from '../../ActionType';
import { Tool } from '../../../../game/tools/Tool';
import { ActionDispatcher } from '../../../../engine/actions/ActionDispatcher';
import { takeEvery, select } from 'redux-saga/effects';
import GameSelections from '../GameSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';

class ReleaseToolActions implements WatchableAction<any> {
    public request(tool: Tool) {
        return {
            type: ActionType.RELEASE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery(ActionType.RELEASE_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: Tool}) {
        const gameActionDispatcher: ActionDispatcher = yield select(GameSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.DEACTIVATE_TOOL, action.tool);
    }
}

export default new ReleaseToolActions();
