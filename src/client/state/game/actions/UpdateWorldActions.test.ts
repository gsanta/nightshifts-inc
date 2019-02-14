import UpdateWorldActions, { getWorld, getGameRequests, getUser } from './UpdateWorldActions';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { select, call, delay, put } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { ActionType } from '../../ActionType';

describe('UpdateWorldActions', () => {
    describe('watch', () => {
        it ('calls UpdateWorldActions.fetch periodically.', () => {
            const watch = UpdateWorldActions.watch();

            const worldMock = sinon.spy();
            const selectWorld = watch.next();

            expect(selectWorld.value).to.eql(select(getWorld));

            const fetchWorld = watch.next(worldMock);
            // expect(fetchWorld.value).to.eql(call(UpdateWorldActions.fetch));

            const delayVal = watch.next();

            expect(delayVal.value).to.eql(delay(10000));
        });
    });
});
