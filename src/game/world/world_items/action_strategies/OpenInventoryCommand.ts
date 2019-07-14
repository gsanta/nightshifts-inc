import { WorldItemActionCommand } from './WorldItemActionCommand';

export class OpenInventoryCommand implements WorldItemActionCommand {
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public execute() {
        this.actionDispatcher.dispatch(GameActionType.OPEN_INVENTORY);
    }
}
