import { Tool } from '../../../game/tools/Tool';
import { ActionType } from '../ActionType';
import findIndex from 'lodash/findIndex';


export const widgetReducer = (state = 100, action: {type: string, health: number}): number => {
    switch (action.type) {
        case ActionType.WIDGET_UPDATE:
            return action.health;
        default:
            return state;
    }
};
