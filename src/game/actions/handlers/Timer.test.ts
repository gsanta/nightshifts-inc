import { Timer } from './Timer';
import * as sinon from 'sinon';

describe('Timer', () => {
    let fakeTimer: sinon.SinonFakeTimers;

    beforeEach(() => {
        fakeTimer = sinon.useFakeTimers();
    });

    afterEach(() => {
        fakeTimer.restore();
    });

    it ('emits `dayPassed` events every time a day passes', () => {
        const callback = sinon.spy();

        const timer = new Timer(100, 10000);
        timer.onDayPassed(callback);
        timer.startTimer();

        fakeTimer.tick(20000);

        timer.cancelTimer();
        sinon.assert.callCount(callback, 2);
    });
});
