import { GameActionType } from '../../GameActionType';
import { ActionDispatcher } from '../../ActionDispatcher';
import { ActionHandler } from '../../ActionHandler';
import Timer from './Timer';


export class TimeActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;

    private timer: Timer;
    // private currentDayTimer =

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                this.timer = new Timer(100);
                this.timer.onDayPassed(() => this.onDayPassed());
                this.timer.startTimer();
                break;
            default:
                break;
        }
    }

    private onDayPassed() {
        this.actionDispatcher.dispatch(GameActionType.DAY_PASSED);
    }
}
