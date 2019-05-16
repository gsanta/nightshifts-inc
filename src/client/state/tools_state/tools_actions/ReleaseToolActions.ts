import { ActionType } from '../../ActionType';
import { ToolIcon } from '../../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';

class ReleaseToolActions {
    public request(tool: ToolIcon) {
        return {
            type: ActionType.RELEASE_TOOL,
            tool
        };
    }
}

export default new ReleaseToolActions();
