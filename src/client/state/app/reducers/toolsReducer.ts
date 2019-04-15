import { Tool } from '../../../../game/tools/Tool';
import { ActionType } from '../../ActionType';
import { ThermometerTool } from '../../../../game/tools/ThermometerTool';
import { FlashlightTool } from '../../../../game/tools/FlashlightTool';

const initialState = [
    new FlashlightTool(),
    new ThermometerTool()
];

export const toolsReducer = (state: Tool[] = initialState, action: {type: string, tool: Tool}): Tool[] => {
    switch (action.type) {
        case ActionType.GRAB_TOOL:
            const tools = [...state];
            tools.splice(tools.indexOf(action.tool), 1, action.tool.setCarrying(true));
            return tools;
        default:
            return state;
    }
};
