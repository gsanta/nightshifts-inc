import { ActionDispatcher } from './ActionDispatcher';
import { World } from '../../game/model/World';
import * as sinon from 'sinon';
import { ActionHandler } from './ActionHandler';


describe('ActionDispatcher', () => {
    describe('registerActionHandler, dispatch', () => {
        it('stores the ActionHandler internally and calls it when dispatching', () => {
            const world: Partial<World> = {};
            const actionDispatcher = new ActionDispatcher(<World> world);

            const sendAction1Spy = sinon.spy();
            const actionHandler1: ActionHandler = {
                sendAction: sendAction1Spy
            };

            const sendAction2Spy = sinon.spy();
            const actionHandler2: ActionHandler = {
                sendAction: sendAction2Spy
            };


            actionDispatcher.registerActionHandler(actionHandler1);
            actionDispatcher.registerActionHandler(actionHandler2);

            const actionType = 'MOVE';
            const destX = 1;
            const destY = 2;
            actionDispatcher.dispatch(actionType, destX, destY);

            sinon.assert.calledWith(sendAction1Spy, actionType, world, destX, destY);
            sinon.assert.calledWith(sendAction2Spy, actionType, world, destX, destY);
        });
    });

    describe('unregisterActionHandler', () => {
        it('removes the ActionHandler and does not dispatch events to it anymore', () => {
            const world: Partial<World> = {};
            const actionDispatcher = new ActionDispatcher(<World> world);

            const sendAction1Spy = sinon.spy();
            const actionHandler1: ActionHandler = {
                sendAction: sendAction1Spy
            };

            const sendAction2Spy = sinon.spy();
            const actionHandler2: ActionHandler = {
                sendAction: sendAction2Spy
            };

            actionDispatcher.registerActionHandler(actionHandler1);
            actionDispatcher.registerActionHandler(actionHandler2);

            actionDispatcher.dispatch('MOVE');

            sinon.assert.calledWith(sendAction1Spy, 'MOVE', world);
            sinon.assert.calledWith(sendAction2Spy, 'MOVE', world);

            actionDispatcher.unregisterActionHandler(actionHandler2);

            actionDispatcher.dispatch('TURN');

            sinon.assert.calledWith(sendAction1Spy, 'TURN', world);
            sinon.assert.neverCalledWith(sendAction2Spy, 'TURN', world);
        });
    });
});
