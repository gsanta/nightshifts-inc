import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ToolIcon } from '../../../tools/ToolIcon';
import { ToolMesh } from '../../../tools/ToolMesh';
import { ActionHandler } from '../../ActionHandler';
import find from 'lodash/find';

export class ToolSelectionActionHandler implements ActionHandler {
    private toolMeshes: ToolMesh[];

    constructor(toolMeshes: ToolMesh[]) {
        this.toolMeshes = toolMeshes;
    }

    public handle(type: string, world: World, tool: ToolIcon) {
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

    private selectToolToActivate(tool: ToolIcon) {
        const toolToActivate = find(this.toolMeshes, toolMesh => toolMesh.name === tool.getName());

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${tool.getName()}`);
        }

        return toolToActivate;
    }
}
