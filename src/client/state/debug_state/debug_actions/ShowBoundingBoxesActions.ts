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

        if (showBoundingBoxes) {
            gameActionDispatcher.dispatch(GameActionType.DISPLAY_BOUNDING_BOXES);
        } else {
            gameActionDispatcher.dispatch(GameActionType.HIDE_BOUNDING_BOXES);
        }
    }
}

export default new ShowBoundingBoxesAction();
