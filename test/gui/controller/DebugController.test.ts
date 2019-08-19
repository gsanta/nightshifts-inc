import { mockControllers, mockGameController, mockControllerFacade } from '../../mocks/controllerMocks';
import * as sinon from 'sinon';
import { GameController } from '../../../src/gui/controller/GameController';
import { DebugController } from '../../../src/gui/controller/DebugController';


describe('DebugController', () => {
    it ('can turn on/off roof display', () => {
        const [controllers, controllerStubs] = mockControllerFacade();

        const debugController = new DebugController(controllers);

        expect(debugController.isRoofDisplayed).toEqual(true);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.displayRoofs);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.hideRoofs);
        sinon.assert.notCalled(controllerStubs.renderController.render);

        debugController.displayRoof(false);

        expect(debugController.isRoofDisplayed).toEqual(false);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.hideRoofs);
        sinon.assert.calledOnce(controllerStubs.renderController.render);

        debugController.displayRoof(true);

        expect(debugController.isRoofDisplayed).toEqual(true);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.displayRoofs);
        sinon.assert.calledTwice(controllerStubs.renderController.render);
    });

    it ('can swtich on/off lights', () => {
        const [controllers, controllerStubs] = mockControllerFacade();

        const debugController = new DebugController(controllers);

        expect(debugController.allLightsOn).toEqual(false);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.turnOnAllLights);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.turnOffAllLights);
        sinon.assert.notCalled(controllerStubs.renderController.render);

        debugController.switchlAllLights(true);

        expect(debugController.allLightsOn).toEqual(true);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.turnOnAllLights);
        sinon.assert.calledOnce(controllerStubs.renderController.render);

        debugController.switchlAllLights(false);

        expect(debugController.allLightsOn).toEqual(false);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.turnOffAllLights);
        sinon.assert.calledTwice(controllerStubs.renderController.render);
    });

    it ('can turn on/off bounding boxes', () => {
        const [controllers, controllerStubs] = mockControllerFacade();

        const debugController = new DebugController(controllers);

        expect(debugController.isBoundingBoxDisplayed).toEqual(false);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.displayBoundingBoxes);
        sinon.assert.notCalled(controllerStubs.gameController.getGameServices().debugServices.hideBoundingBoxes);
        sinon.assert.notCalled(controllerStubs.renderController.render);

        debugController.displayBoundingBoxes(true);

        expect(debugController.isBoundingBoxDisplayed).toEqual(true);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.displayBoundingBoxes);
        sinon.assert.calledOnce(controllerStubs.renderController.render);

        debugController.displayBoundingBoxes(false);

        expect(debugController.isBoundingBoxDisplayed).toEqual(false);
        sinon.assert.calledOnce(controllerStubs.gameController.getGameServices().debugServices.hideBoundingBoxes);
        sinon.assert.calledTwice(controllerStubs.renderController.render);
    });
});
