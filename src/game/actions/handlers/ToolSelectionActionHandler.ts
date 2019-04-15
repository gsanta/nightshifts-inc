import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { Tool } from '../../tools/Tool';
import { ToolMesh } from '../../../engine/tools/ToolMesh';
import _ = require('lodash');


export class ToolSelectionActionHandler implements ActionHandler {
    private toolMeshes: ToolMesh[];

    constructor(toolMeshes: ToolMesh[]) {
        this.toolMeshes = toolMeshes;
    }

    public sendAction(type: string, world: World, tool: Tool) {
        switch (type) {
            case GameActionType.ACTIVATE_TOOL:
                this.selectToolToActivate(tool).enable();
                break;
            case GameActionType.DEACTIVATE_TOOL:
                this.selectToolToActivate(tool).disable();
                break;
            default:
                break;
        }
    }

    private selectToolToActivate(tool: Tool) {
        const toolToActivate = _.find(this.toolMeshes, toolMesh => toolMesh.name === tool.getName());

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${tool.getName()}`);
        }

        return toolToActivate;
    }
}
