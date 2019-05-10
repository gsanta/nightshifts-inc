import { WatchableAction, ActionType } from '../../ActionType';
import { ActionDispatcher } from '../../../../game/actions/ActionDispatcher';
import WorldSelections from '../../world_state/world_actions/WorldSelections';
import { GameActionType } from '../../../../game/actions/GameActionType';
import { DebugOptions } from '../../../components/dialogs/debug_dialog/DebugOptions';
import { select, takeEvery } from 'redux-saga/effects';


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
        const gameActionDispatcher: ActionDispatcher = yield select(WorldSelections.getGameActionDispatcher);
        gameActionDispatcher.dispatch(GameActionType.CREATE_BOUNDING_POLYGON_MESHES);
    }
}

export default new ShowBoundingBoxesAction();
