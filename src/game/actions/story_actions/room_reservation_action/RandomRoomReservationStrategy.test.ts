import { RandomRoomReservationStrategy } from './RandomRoomReservationStrategy';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('RandomRoomReservationStrategy', () => {
    describe('reserveRoom', () => {
        it ('chooses a random', () => {
            const rooms = [1, 2, 3];

            sinon.stub(Math, 'random').returns(0.6);


            const randomRoomReservationStrategy = new RandomRoomReservationStrategy();
            const reservedRoom = randomRoomReservationStrategy.chooseRoom(<any> rooms);

            expect(reservedRoom).to.eql(2);
        });
    });
});
