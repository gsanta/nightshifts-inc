import { ToolIcon } from '../../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionType } from '../../ActionType';

class GrabToolActions {
    public request(tool: ToolIcon, storageIndex: number) {

        return {
            type: ActionType.GRAB_TOOL,
            tool,
            storageIndex
        };
    }
}

export default new GrabToolActions();
