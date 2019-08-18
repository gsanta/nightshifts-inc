import { mockController as mockControllers } from '../../setup/controllerSetup';
import * as sinon from 'sinon';


describe('ToolController', () => {

    describe('grabTool', () => {
        it ('grabs the tool', () => {
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

        
    });
});
