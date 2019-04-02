import { WatchableAction, ActionType } from '../../ActionType';
import { Tool } from '../../../gui/components/dialogs/inventory/Tool';

class GrabToolActions {
    public request(tool: Tool) {
        return {
            type: ActionType.UPDATE_GAME_REQUEST,
            tool
        };
    }
}

export default new GrabToolActions();
