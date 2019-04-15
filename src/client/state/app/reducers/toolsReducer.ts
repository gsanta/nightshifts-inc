import { Tool } from '../../../components/dialogs/inventory_dialog/Tool';
import { ActionType } from '../../ActionType';

const initialState = [{
    name: 'flashlight',
    isCarrying: false
}];

export const toolsReducer = (state: Tool[] = initialState, action): Tool[] => {
    switch (action.type) {
        case ActionType.GRAB_TOOL:
            const updatedTool: Tool = {...action.tool, ...{isCarrying: true}};

            const tools = [...state];
            tools.splice(tools.indexOf(action.tool), 1, updatedTool);
            return tools;
        default:
            return state;
    }
};
