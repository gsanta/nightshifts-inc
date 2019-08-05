import { World } from '../model/game_objects/World';
import { ToolIcon } from '../../client/components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import _ from 'lodash';

export class ToolService {
    private world: World;
    private openInventoryFunc: () => void;

    constructor(world: World, openInventoryFunc: () => void) {
        this.world = world;
        this.openInventoryFunc = openInventoryFunc;
    }

    public activateTool(toolIcon: ToolIcon) {
        const tool = this.selectToolByName(toolIcon.name);
        _.without(this.world.tools, tool).forEach(t => t.disable());
        tool.enable();
    }

    public deactivateTool(toolIcon: ToolIcon) {
        this.selectToolByName(toolIcon.name).disable();
    }

    public openInventory() {
        this.openInventoryFunc();
    }

    private selectToolByName(name: string) {
        const toolToActivate = this.world.tools.find(toolMesh => toolMesh.name === name);

        if (!toolToActivate) {
            throw new Error(`No matching ToolActivationPlugin for tool: ${name}`);
        }

        return toolToActivate;
    }
}