import { ServiceFacade } from '../../game/services/ServiceFacade';
import { ToolIcon } from '../components/dialogs/inventory/tools_icons/ToolIcon';

/**
 * Works as an adapter between the UI controller logic (represented by *Controller classes) and the game services logic (represented by *Services classes).
 * So this is the single entry point for the UI where it can reach the game controlling logic.
 */
export class GameController {
    private gameServices: ServiceFacade;

    setGameServices(gameServices: ServiceFacade) {
        this.gameServices = gameServices;
    }

    activateTool(tool: ToolIcon) {
        this.checkIfGameServicesSet();
        this.gameServices.toolServices.activateTool(tool);
    }

    deActivateTool(tool: ToolIcon) {
        this.checkIfGameServicesSet();
        this.gameServices.toolServices.deactivateTool(tool);
    }

    private checkIfGameServicesSet() {
        if (!this.gameServices) {
            throw new Error('GameServices not set yet.');
        }
    }
}