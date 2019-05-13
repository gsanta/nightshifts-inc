import { ToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionType } from '../ActionType';
import { ThermometerToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/ThermometerToolIcon';
import { FlashlightToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/FlashlightToolIcon';
import findIndex from 'lodash/findIndex';
import { CameraToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/CameraToolIcon';

const initialState = [
    new FlashlightToolIcon(),
    new ThermometerToolIcon(),
    new CameraToolIcon()
];

export const toolsReducer = (state: ToolIcon[] = initialState, action: {type: string, tool: ToolIcon}): ToolIcon[] => {
    const tools = [...state];
    let index: number;
    switch (action.type) {
        case ActionType.GRAB_TOOL:
            index = findIndex(tools, tool => tool.getName() === action.tool.getName());
            tools.splice(index, 1, action.tool.setCarrying(true));
            return tools;
        case ActionType.RELEASE_TOOL:
            index = findIndex(tools, tool => tool.getName() === action.tool.getName());
            tools.splice(index, 1, action.tool.setCarrying(false));
            return tools;
        default:
            return state;
    }
};
