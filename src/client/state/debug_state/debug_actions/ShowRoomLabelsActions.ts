import { select, takeEvery } from 'redux-saga/effects';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { ActionType, WatchableAction } from '../../ActionType';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';


class ShowRoomLabelsActions implements WatchableAction<any> {
    public request(showRoomLabels: boolean) {
        return {
            type: ActionType.DEBUG_SHOW_ROOM_LABELS,
            showRoomLabels
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_SHOW_ROOM_LABELS, this.activateTool);
    }

    private *activateTool({showRoomLabels}: Partial<DebugOptions>) {
        const services: ServiceFacade = yield select(WorldSelections.getServices);
        if (showRoomLabels) {
            services.debugServices.displayRoofs();
        } else {
            services.debugServices.hideRoofs();
        }
    }
}

export default new ShowRoomLabelsActions();
