import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { Room } from '../../../engine/world_items/Room';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ActionDispatcher } from '../../../engine/actions/ActionDispatcher';
import { Timer } from '../../Timer';


export class TimeActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;
    private dayDuration = 10000;

    private timer: Timer;
    // private currentDayTimer =

    constructor(actionDispatcher: ActionDispatcher) {
        this.timer = new Timer();
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.NEXT_TICK:
                this.timer.getDelta();
                console.log(delta);
                break;
            default:
                break;
        }
    }
}
