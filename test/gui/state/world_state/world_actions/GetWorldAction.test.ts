import { expect } from 'chai';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import { ActionType } from '../../../../../src/gui/state/ActionType';
import * as sinon from 'sinon';
import GetWorldActions from '../../../../../src/gui/state/world_state/world_actions/GetWorldActions';
import { WorldRequests } from '../../../../../src/gui/state/world_state/WorldRequests';
declare const describe, beforeEach, afterEach, it;

describe('GetWorldAction', () => {
    describe('watch', () => {
        it ('calls the right actions', () => {
            const watch = GetWorldActions.watch();
            const val = watch.next();

            expect(val.value).to.eql(takeEvery(ActionType.GET_WORLD_SUCCESS, GetWorldActions.fetch));
        });
    });

    describe('fetch', () => {
        it ('calls the webservice and and gets the \'world\'', () => {
            const worldMock = sinon.spy();
            const userMock = sinon.spy();

            const getWorldByUserId = sinon.stub();
            getWorldByUserId.withArgs(userMock).resolves(worldMock);
            const gameRequestMock: Partial<WorldRequests> = {
                getWorldByUserId
            };

            const fetch = GetWorldActions.fetch();

            fetch.next();
            fetch.next(gameRequestMock);

            const callGetWorld = fetch.next(userMock);
            expect(callGetWorld.value).to.eql(call([gameRequestMock, gameRequestMock.getWorldByUserId], <any> userMock));

            const putGetWorldSuccess = fetch.next(worldMock);
            expect(putGetWorldSuccess.value).to.eql(put({type: ActionType.GET_WORLD_SUCCESS, world: worldMock}));
        });
    });
});
