import { DebugOptions } from '../../../../gui/components/dialogs/debug/DebugOptions';
import { select, takeEvery } from 'redux-saga/effects';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';
import { WatchableAction, ActionType } from '../../ActionType';
import WorldSelections from '../../world_state/world_actions/WorldSelections';


class TurnOnAllLightsActions implements WatchableAction<any> {
    public request(activate: boolean) {
        return {
            type: ActionType.DEBUG_TURN_ON_ALL_LIGHTS,
            areAllLightsTurnedOn: activate
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.DEBUG_TURN_ON_ALL_LIGHTS, this.activateTool);
    }

    private *activateTool({areAllLightsTurnedOn}: Partial<DebugOptions>) {
        const services: ServiceFacade = yield select(WorldSelections.getServices);
        if (areAllLightsTurnedOn) {
            services.debugServices.turnOnAllLights();
            // gameActionDispatcher.unregisterActionHandler(ActiveRoomLightingActionHandler.getInstance());
        } else {
            services.debugServices.turnOffAllLights();

            // gameActionDispatcher.registerActionHandler(ActiveRoomLightingActionHandler.getInstance());
            // gameActionDispatcher.dispatch(GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS);
        }
    }
}

export default new TurnOnAllLightsActions();
