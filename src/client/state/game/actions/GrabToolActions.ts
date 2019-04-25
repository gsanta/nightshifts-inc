import { ActionType, WatchableAction } from '../../ActionType';
import { Tool } from '../../../../game/tools/Tool';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import { takeEvery, select } from 'redux-saga/effects';
import GameSelections from '../GameSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';

class GrabToolActions implements WatchableAction<any> {
    public request(tool: Tool) {

        return {
            type: ActionType.GRAB_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery(ActionType.GRAB_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: Tool}) {
        const gameActionDispatcher: ActionDispatcher = yield select(GameSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.ACTIVATE_TOOL, action.tool);
    }
}

export default new GrabToolActions();
