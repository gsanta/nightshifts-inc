import { WorldItemActionCommand } from './WorldItemActionCommand';
import { ActionDispatcher } from '../../../actions/ActionDispatcher';
import { GameActionType } from '../../../actions/GameActionType';

export class OpenInventoryCommand implements WorldItemActionCommand {
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public execute() {
        this.actionDispatcher.dispatch(GameActionType.OPEN_INVENTORY);
    }
}
