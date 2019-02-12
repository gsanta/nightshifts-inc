import { UpdateWorldActions, getWorld, getGameRequests, getUser } from './UpdateWorldActions';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { select, call, delay, put } from 'redux-saga/effects';
import { GameRequests } from '../GameRequests';
import { ActionType } from '../../../stores/ActionType';

describe('UpdateWorldActions', () => {
    describe('watch', () => {
        it ('calls UpdateWorldActions.fetch periodically.', () => {
            const watch = UpdateWorldActions.watch();

            const worldMock = sinon.spy();
            const selectWorld = watch.next();

            expect(selectWorld.value).to.eql(select(getWorld));

            const fetchWorld = watch.next(worldMock);
            expect(fetchWorld.value).to.eql(call(UpdateWorldActions.fetch));

            const delayVal = watch.next();

            expect(delayVal.value).to.eql(delay(10000));
        });
    });

    describe('fetch', () => {
        it ('calls the webservice and updates the \'world\'', () => {
            const worldMock = sinon.spy();
            const userMock = sinon.spy();

            const update = sinon.stub();
            update.withArgs(userMock).resolves(null);
            const gameRequestMock: Partial<GameRequests> = {
                update
            };

            const fetch = UpdateWorldActions.fetch();

            const selectGameRequest = fetch.next();
            expect(selectGameRequest.value).to.eql(select(getGameRequests));

            const selectUser = fetch.next(gameRequestMock);
            expect(selectUser.value).to.eql(select(getUser));

            const selectWorld = fetch.next(userMock);
            expect(selectWorld.value).to.eql(select(getWorld));

            const callUpdate = fetch.next(worldMock);
            expect(callUpdate.value).to.eql(call([gameRequestMock, update], userMock, worldMock));

            const putUpdateSuccess = fetch.next();
            expect(putUpdateSuccess.value).to.eql(put({type: ActionType.UPDATE_GAME_SUCCESS}));

            expect(fetch.next().done).to.eq(true);
        });

        // it.only ('sends a failure action, if an error occurs', () => {
        //     const fetch = UpdateWorldActions.fetch();
        //     debugger;
        //     const putFailure = fetch.next('Something went wrong');
        //     fetch.throw('abcd')

        //     // const putFailure = fetch.next();
        //     expect(putFailure.value).to.eql(put({type: ActionType.UPDATE_GAME_FAILURE}));
        // });
    });
});
