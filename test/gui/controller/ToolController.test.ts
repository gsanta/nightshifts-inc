import { mockControllers as mockControllers } from '../../mocks/controllerMocks';
import * as sinon from 'sinon';
import { GameController } from '../../../src/gui/controller/GameController';


describe('ToolController', () => {
    it ('can grab a tool', () => {
        const controllers = mockControllers();
        const renderSpy = sinon.spy();
        controllers.renderController.setRender(renderSpy);
        const toolController = controllers.toolController;

        const tool = toolController.tools[0];

        expect(tool.isCarrying).toEqual(false);
        sinon.assert.notCalled(renderSpy);

        toolController.grabTool(tool, 1);

        expect(tool.isCarrying).toEqual(true);
        sinon.assert.called(renderSpy);
    });

    it ('can release a tool', () => {
        const controllers = mockControllers();
        const renderSpy = sinon.spy();
        controllers.renderController.setRender(renderSpy);
        const toolController = controllers.toolController;

        const tool = toolController.tools[0];
        tool.isCarrying = true;

        sinon.assert.notCalled(renderSpy);

        toolController.releaseTool(tool);

        expect(tool.isCarrying).toEqual(false);
        sinon.assert.called(renderSpy);
    });

    it ('can activate a tool', () => {
        const controllers = mockControllers();
        const renderSpy = sinon.spy();
        controllers.renderController.setRender(renderSpy);

        const activateToolSpy = sinon.spy();
        controllers.gameController = <GameController> {
            activateTool: <any> activateToolSpy
        };

        const toolController = controllers.toolController;

        const tool = toolController.tools[0];

        expect(tool.isActive).toEqual(false);
        sinon.assert.notCalled(renderSpy);
        sinon.assert.notCalled(activateToolSpy);

        toolController.activateTool(tool);

        expect(tool.isActive).toEqual(true);
        sinon.assert.called(renderSpy);
        sinon.assert.calledWith(activateToolSpy, tool);
    });

    it ('can de-activate a tool', () => {
        const controllers = mockControllers();
        const renderSpy = sinon.spy();
        controllers.renderController.setRender(renderSpy);

        const deactivateToolSpy = sinon.spy();
        controllers.gameController = <GameController> {
            deactivateTool: <any> deactivateToolSpy
        };

        const toolController = controllers.toolController;

        const tool = toolController.tools[0];
        tool.isActive = true;

        sinon.assert.notCalled(renderSpy);
        sinon.assert.notCalled(deactivateToolSpy);

        toolController.deactivateTool(tool);

        expect(tool.isActive).toEqual(false);
        sinon.assert.called(renderSpy);
        sinon.assert.calledWith(deactivateToolSpy, tool);
    });
});
