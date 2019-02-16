import GetWorldActions from './GetWorldActions';
import { expect } from 'chai';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import { ActionType } from '../../ActionType';
import { GameRequests } from '../GameRequests';
import * as sinon from 'sinon';


describe('GetWorldAction', () => {
    describe('watch', () => {
        it ('calls the right actions', () => {
            const watchOnce = GetWorldActions.watch();
            const val = watchOnce.next();

            expect(val.value).to.eql(takeEvery(ActionType.GET_USER_SUCCESS, GetWorldActions.fetch));
        });
    });

    describe('fetch', () => {
        it ('calls the webservice and and gets the \'world\'', () => {
            const worldMock = sinon.spy();
            const userMock = sinon.spy();

            const getWorldByUserId = sinon.stub();
            getWorldByUserId.withArgs(userMock).resolves(worldMock);
            const gameRequestMock: Partial<GameRequests> = {
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
