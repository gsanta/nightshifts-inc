import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ToolActivationPlugin } from './ToolActivationPlugin';
import { Tool } from '../../../client/gui/components/dialogs/inventory/Tool';
import _ = require('lodash');


export class ToolSelectionActionHandler implements ActionHandler {
    private toolActivationPlugins: ToolActivationPlugin[];

    constructor(toolActivationPlugins: ToolActivationPlugin[]) {
        this.toolActivationPlugins = toolActivationPlugins;
    }

    public sendAction(type: string, world: World, tool: Tool) {
        switch (type) {
            case GameActionType.ACTIVATE_TOOL:
                this.selectToolToActivate(tool).activate();
                break;
            case GameActionType.DEACTIVATE_TOOL:
                this.selectToolToActivate(tool).deactivate();
                break;
            default:
                break;
        }
    }

    private selectToolToActivate(tool: Tool) {
        const toolToActivate = _.find(this.toolActivationPlugins, plugin => plugin.toolName === tool.name);

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${tool.name}`);
        }

        return toolToActivate;
    }
}
