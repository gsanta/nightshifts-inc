import { EventEmitter } from 'events';

export class Timer extends EventEmitter {
    private prevTime: number;

    private hourDuration = 10000;
    private hourTimer = 0;

    constructor() {
        super();
        this.prevTime = Date.now();
    }

    public reset() {
        this.prevTime = Date.now();
    }

    public getDelta(): number {
        const currentTime = Date.now();
        const delta = currentTime - this.prevTime;
        this.handleHourTimer(delta);
        this.prevTime = currentTime;
        return delta;
    }

    public onHourPassed(handler: () => void) {
        this.on('hourPassed', handler);
    }

    private handleHourTimer(delta: number) {
        this.hourTimer += delta;

        if (this.isHourPassed()) {
            this.emitHourPassed();
            this.hourTimer = 0;
        }
    }

    private isHourPassed() {
        return this.hourTimer > this.hourDuration;
    }

    private emitHourPassed() {
        this.emit('hourPassed');
    }
}
