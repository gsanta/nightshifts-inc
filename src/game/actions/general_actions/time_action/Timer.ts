import { EventEmitter } from 'events';

/**
 * Responsible for emitting events periodically when a specific interval is reached (e.g an day passed, a minute passed etc.).
 * The notion of time can be configured so an day does not actually mean an day in real life, but in the game.
 */
export default class Timer extends EventEmitter {
    private updateInterval: number;
    private intervalId: any;
    private prevTime: number;
    private dayTimer: number;
    private dayDuration: number;

    /**
     *
     * @param samplingInterval The interval the timer updates itself and checks wheter a specific event has been reached.
     * @param dayDuration The duration of an day in the game in milliseconds
     */
    constructor(samplingInterval: number, dayDuration = 1000) {
        super();
        this.dayTimer = 0;
        this.prevTime = Date.now();
        this.updateInterval = samplingInterval;
        this.dayDuration = dayDuration;
    }

    public startTimer() {
        this.intervalId = setInterval(() => this.update(), this.updateInterval);
    }

    public cancelTimer() {
        clearInterval(this.intervalId);
    }

    public onDayPassed(handler: () => void) {
        this.on('dayPassed', handler);
    }

    private handleDayTimer(delta: number) {
        this.dayTimer += delta;

        if (this.isDayPassed()) {
            this.emitDayPassed();
            this.dayTimer = 0;
        }
    }

    private isDayPassed() {
        return this.dayTimer >= this.dayDuration;
    }

    private emitDayPassed() {
        this.emit('dayPassed');
    }

    private update(): number {
        const currentTime = Date.now();
        const delta = currentTime - this.prevTime;
        this.handleDayTimer(delta);
        this.prevTime = currentTime;
        return delta;
    }
}
