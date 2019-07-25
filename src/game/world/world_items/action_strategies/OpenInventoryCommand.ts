import { WorldItemActionCommand } from './WorldItemActionCommand';
import { ToolService } from '../../../services/ToolService';

export class OpenInventoryCommand implements WorldItemActionCommand {
    private toolService: ToolService;

    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    public execute() {
        this.toolService.openInventory();
    }
}
