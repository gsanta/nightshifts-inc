import { WatchableAction, ActionType } from '../../ActionType';
import { Tool } from '../../../gui/components/dialogs/inventory/Tool';

class GrabToolActions {
    public request(tool: Tool) {
        return {
            type: ActionType.GRAB_TOOL,
            tool
        };
    }
}

export default new GrabToolActions();
