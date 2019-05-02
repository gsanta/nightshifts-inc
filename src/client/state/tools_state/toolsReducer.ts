import { Tool } from '../../../game/tools/Tool';
import { ActionType } from '../ActionType';
import { ThermometerTool } from '../../../game/tools/ThermometerTool';
import { FlashlightTool } from '../../../game/tools/FlashlightTool';
import findIndex from 'lodash/findIndex';

const initialState = [
    new FlashlightTool(),
    new ThermometerTool()
];

export const toolsReducer = (state: Tool[] = initialState, action: {type: string, tool: Tool}): Tool[] => {
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
