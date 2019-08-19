import { DebugOptions } from '../components/dialogs/debug/DebugOptions';
import { ControllerFacade } from './ControllerFacade';


const initialState: DebugOptions = {
    areAllLightsTurnedOn: false,
    showRoomLabels: true,
    showBoundingBoxes: false
};

export class DebugController {
    readonly controllers: ControllerFacade;
    isRoofDisplayed: boolean;
    allLightsOn: boolean;
    isBoundingBoxDisplayed: boolean;

    constructor(controllers: ControllerFacade) {
        this.controllers = controllers;
    }

    displayRoof(display: boolean) {
        if (display) {
            this.isRoofDisplayed = true;
            this.controllers.gameController.getGameServices().debugServices.displayRoofs();
        } else {
            this.isRoofDisplayed = false;
            this.controllers.gameController.getGameServices().debugServices.hideRoofs();
        }
        this.controllers.renderController.reRender();
    }

    switchlAllLights(on: boolean) {
        if (on) {
            this.allLightsOn = true;
            this.controllers.gameController.getGameServices().debugServices.turnOnAllLights();
        } else {
            this.allLightsOn = false;
            this.controllers.gameController.getGameServices().debugServices.turnOffAllLights();
        }
        this.controllers.renderController.reRender();
    }

    displayBoundingBoxes(on: boolean) {
        if (on) {
            this.controllers.gameController.getGameServices().debugServices.displayBoundingBoxes();
        } else {
            this.controllers.gameController.getGameServices().debugServices.hideBoundingBoxes();
        }
    }
}
