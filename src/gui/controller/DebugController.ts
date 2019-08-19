import { DebugOptions } from '../components/dialogs/debug/DebugOptions';
import { ControllerFacade } from './ControllerFacade';


export class DebugController {
    readonly controllers: ControllerFacade;
    isRoofDisplayed = true;
    allLightsOn = false;
    isBoundingBoxDisplayed = false;

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
        this.controllers.renderController.render();
    }

    switchlAllLights(on: boolean) {
        if (on) {
            this.allLightsOn = true;
            this.controllers.gameController.getGameServices().debugServices.turnOnAllLights();
        } else {
            this.allLightsOn = false;
            this.controllers.gameController.getGameServices().debugServices.turnOffAllLights();
        }
        this.controllers.renderController.render();
    }

    displayBoundingBoxes(on: boolean) {
        if (on) {
            this.isBoundingBoxDisplayed = true;
            this.controllers.gameController.getGameServices().debugServices.displayBoundingBoxes();
        } else {
            this.isBoundingBoxDisplayed = false;
            this.controllers.gameController.getGameServices().debugServices.hideBoundingBoxes();
        }
        this.controllers.renderController.render();
    }
}
