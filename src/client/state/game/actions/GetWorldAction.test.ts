import { GetWorldActions } from './GetWorldActions';
import { expect } from 'chai';
import { take } from 'redux-saga/effects';
import { ActionType } from '../../../stores/ActionType';


describe('GetWorldAction', () => {
    describe('watchOnce', () => {
        it.only ('calls the right actions', () => {
            const watchOnce = GetWorldActions.watchOnce();
            const val = watchOnce.next().value;

            expect(val).to.eql(take(ActionType.GET_USER_SUCCESS));
        });
    });
});
