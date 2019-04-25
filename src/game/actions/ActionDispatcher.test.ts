import { ActionDispatcher } from './ActionDispatcher';
import { World } from '../model/World';
import * as sinon from 'sinon';
import { ActionHandler } from './ActionHandler';
import { GameActionType } from './GameActionType';


describe('ActionDispatcher', () => {
    describe('registerActionHandler, dispatch', () => {
        it('stores the ActionHandler internally and calls it when dispatching', () => {
            const world: Partial<World> = {};
            const actionDispatcher = new ActionDispatcher(<World> world);

            const sendAction1Spy = sinon.spy();
            const actionHandler1: ActionHandler = {
                handle: sendAction1Spy
            };

            const sendAction2Spy = sinon.spy();
            const actionHandler2: ActionHandler = {
                handle: sendAction2Spy
            };


            actionDispatcher.registerActionHandler(actionHandler1);
            actionDispatcher.registerActionHandler(actionHandler2);

            const actionType = GameActionType.NEXT_TICK;
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
                handle: sendAction1Spy
            };

            const sendAction2Spy = sinon.spy();
            const actionHandler2: ActionHandler = {
                handle: sendAction2Spy
            };

            actionDispatcher.registerActionHandler(actionHandler1);
            actionDispatcher.registerActionHandler(actionHandler2);

            actionDispatcher.dispatch(GameActionType.NEXT_TICK);

            sinon.assert.calledWith(sendAction1Spy, GameActionType.NEXT_TICK, world);
            sinon.assert.calledWith(sendAction2Spy, GameActionType.NEXT_TICK, world);

            actionDispatcher.unregisterActionHandler(actionHandler2);

            actionDispatcher.dispatch('TURN');

            sinon.assert.calledWith(sendAction1Spy, 'TURN', world);
            sinon.assert.neverCalledWith(sendAction2Spy, 'TURN', world);
        });
    });
});
