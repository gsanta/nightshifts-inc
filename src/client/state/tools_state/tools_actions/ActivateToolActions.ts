import { select, takeEvery } from 'redux-saga/effects';
import { ToolIcon } from '../../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionType, WatchableAction } from '../../ActionType';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';


class ActivateToolActions implements WatchableAction<any> {
    public request(tool: ToolIcon) {
        return {
            type: ActionType.ACTIVATE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.ACTIVATE_TOOL, this.activateTool);
    }

    private *activateTool(action: {tool: ToolIcon}) {
        const services: ServiceFacade = yield select(WorldSelections.getServices);
        services.toolServices.activateTool(action.tool);
    }
}

export default new ActivateToolActions();
