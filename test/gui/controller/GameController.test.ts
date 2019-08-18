import { GameController } from '../../../src/gui/controller/GameController';
import { ServiceFacade } from '../../../src/game/services/ServiceFacade';
import * as sinon from 'sinon';
import { ToolService } from '../../../src/game/services/ToolService';
import { ToolIcon } from '../../../src/gui/components/dialogs/inventory/tools_icons/ToolIcon';
import { mockControllers } from '../../setup/controllerSetup';


describe('GameController', () => {

    it ('can notify the game service when a tool is activated', () => {
        const controllers = mockControllers();

        const activateToolSpy = sinon.spy();
        const gameServices = <ServiceFacade> {
            toolServices: <ToolService> {
                activateTool: <any> activateToolSpy
            }
        };

        const gameController = new GameController();
        gameController.setGameServices(gameServices);

        sinon.assert.notCalled(activateToolSpy);

        const tool = controllers.toolController.tools[0];

        gameController.activateTool(tool);

        sinon.assert.calledWith(activateToolSpy, tool);
    });

    it ('can notify the game service when a tool is de-activated', () => {
        const controllers = mockControllers();

        const deactivateToolSpy = sinon.spy();
        const gameServices = <ServiceFacade> {
            toolServices: <ToolService> {
                deactivateTool: <any> deactivateToolSpy
            }
        };

        const gameController = new GameController();
        gameController.setGameServices(gameServices);

        sinon.assert.notCalled(deactivateToolSpy);

        const tool = controllers.toolController.tools[0];

        gameController.deactivateTool(tool);

        sinon.assert.calledWith(deactivateToolSpy, tool);
    });

    it ('throws an error when the game services are not set', () => {
        const controllers = mockControllers();

        const deactivateToolSpy = sinon.spy();
        const gameServices = <ServiceFacade> {
            toolServices: <ToolService> {
                deactivateTool: <any> deactivateToolSpy
            }
        };

        const gameController = new GameController();

        const tool = controllers.toolController.tools[0];

        expect(() => gameController.activateTool(tool)).toThrow('GameServices not set yet.');
        expect(() => gameController.deactivateTool(tool)).toThrow('GameServices not set yet.');
    });
});
