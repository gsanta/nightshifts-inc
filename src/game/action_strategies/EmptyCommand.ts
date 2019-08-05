import { WorldItemActionCommand } from './WorldItemActionCommand';

export class EmptyCommand implements WorldItemActionCommand {

    public execute() {
        // do nothing
    }
}
