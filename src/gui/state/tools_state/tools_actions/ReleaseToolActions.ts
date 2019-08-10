import { ActionType, WatchableAction } from '../../ActionType';
import { ToolIcon } from '../../../components/dialogs/inventory/tools_icons/ToolIcon';
import { takeEvery, put } from 'redux-saga/effects';

class ReleaseToolActions implements WatchableAction<any> {
    public request(tool: ToolIcon) {
        return {
            type: ActionType.RELEASE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.RELEASE_TOOL, this.deactivateTool);
    }

    private *deactivateTool(action: {tool: ToolIcon}) {
        yield put({ type: ActionType.DEACTIVATE_TOOL, tool: action.tool });
    }
}

export default new ReleaseToolActions();
