import { takeEvery, select } from 'redux-saga/effects';
import { ToolIcon } from '../../../components/dialogs/inventory/tools_icons/ToolIcon';
import { ActionType, WatchableAction } from '../../ActionType';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';
import WorldSelections from '../../world_state/world_actions/WorldSelections';


class DeactivateToolActions implements WatchableAction<any> {
    public request(tool: ToolIcon) {
        return {
            type: ActionType.DEACTIVATE_TOOL,
            tool
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEACTIVATE_TOOL, this.deactivateTool);
    }

    private *deactivateTool(action: {tool: ToolIcon}) {
        const services: ServiceFacade = yield select(WorldSelections.getServices);
        services.toolServices.deactivateTool(action.tool);
    }
}

export default new DeactivateToolActions();