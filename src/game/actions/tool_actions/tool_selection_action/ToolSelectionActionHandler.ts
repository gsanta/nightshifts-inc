import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ToolIcon } from '../../../../client/components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { Tool } from '../../../tools/Tool';
import { ActionHandler } from '../../ActionHandler';
import find from 'lodash/find';
import _ from 'lodash';

export class ToolSelectionActionHandler implements ActionHandler {
    private toolMeshes: Tool[];

    constructor(toolMeshes: Tool[]) {
        this.toolMeshes = toolMeshes;
    }

    public handle(type: string, world: World, toolIcon: ToolIcon) {
        switch (type) {
            case GameActionType.ACTIVATE_TOOL:
                const tool = this.selectToolByName(toolIcon.name);
                _.without(this.toolMeshes, tool).forEach(t => t.disable());
                tool.enable();
                break;
            case GameActionType.DEACTIVATE_TOOL:
                this.selectToolByName(toolIcon.name).disable();
                break;
            default:
                break;
        }
    }

    private selectToolByName(name: string) {
        const toolToActivate = find(this.toolMeshes, toolMesh => toolMesh.name === name);

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${name}`);
        }

        return toolToActivate;
    }
}
