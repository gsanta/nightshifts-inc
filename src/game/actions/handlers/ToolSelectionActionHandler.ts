import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ToolActivationPlugin } from './ToolActivationPlugin';
import { Tool } from '../../tools/Tool';
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
        const toolToActivate = _.find(this.toolActivationPlugins, plugin => plugin.toolName === tool.getName());

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${tool.getName()}`);
        }

        return toolToActivate;
    }
}
