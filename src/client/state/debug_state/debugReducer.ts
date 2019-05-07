import { DebugOptions } from '../../components/dialogs/debug_dialog/DebugOptions';
import { ActionType } from '../ActionType';

const initialState: DebugOptions = {
    areAllLightsTurnedOn: false,
    showRoomLabels: false
};

export const debugReducer = (state: DebugOptions = initialState, action: Partial<DebugOptions> & {type: string}): DebugOptions => {
    switch (action.type) {
        case ActionType.DEBUG_TURN_ON_ALL_LIGHTS:
            return {...state, areAllLightsTurnedOn: action.areAllLightsTurnedOn};
        case ActionType.DEBUG_SHOW_ROOM_LABELS:
            return {...state, showRoomLabels: action.showRoomLabels};
        default:
            return state;
    }
};
