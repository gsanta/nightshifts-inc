import { GetWorldActions } from './GetWorldActions';
import { expect } from 'chai';
import { take, put, call } from 'redux-saga/effects';
import { ActionType } from '../../../stores/ActionType';
import { GameRequests } from '../GameRequests';
import * as sinon from 'sinon';


describe('GetWorldAction', () => {
    describe('watchOnce', () => {
        it ('calls the right actions', () => {
            const watchOnce = GetWorldActions.watchOnce();
            const val = watchOnce.next().value;

            expect(val).to.eql(take(ActionType.GET_USER_SUCCESS));
        });
    });

    describe('fetch', () => {
        it.only ('calls the webservice and and gets the \'world\'', () => {
            const fetch = GetWorldActions.fetch();
            const worldMock = sinon.spy();
            const userMock = sinon.spy();

            const getWorldByUserId = sinon.stub();
            getWorldByUserId.withArgs(userMock).resolves(worldMock);
            const gameRequestMock: Partial<GameRequests> = {
                getWorldByUserId
            };


            fetch.next();
            fetch.next(gameRequestMock);

            const callGetWorld = fetch.next(userMock);
            expect(callGetWorld).to.eql(call([gameRequestMock, gameRequestMock.getWorldByUserId], <any> userMock));

            const putGetWorldSuccess = fetch.next(worldMock);
            expect(putGetWorldSuccess).to.eql(put({type: ActionType.GET_WORLD_SUCCESS, worldMock}));
        });
    });
});
