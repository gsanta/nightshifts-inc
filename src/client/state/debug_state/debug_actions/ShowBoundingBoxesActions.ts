import { select, takeEvery } from 'redux-saga/effects';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { ActionType, WatchableAction } from '../../ActionType';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';


class ShowBoundingBoxesAction implements WatchableAction<any> {
    public request(showBoundingBoxes: boolean): Partial<DebugOptions> & {type: string} {
        return {
            type: ActionType.DEBUG_SHOW_BOUNDING_BOXES,
            showBoundingBoxes
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_SHOW_BOUNDING_BOXES, this.activate);
    }

    private *activate({showBoundingBoxes}: Partial<DebugOptions>) {
        const services: ServiceFacade = yield select(WorldSelections.getServices);

        if (showBoundingBoxes) {
            services.debugServices.displayBoundingBoxes();
        } else {
            services.debugServices.hideBoundingBoxes();
        }
    }
}

export default new ShowBoundingBoxesAction();
