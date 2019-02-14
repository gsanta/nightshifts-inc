import { ActionType } from '../../../stores/ActionType';

class ClearErrorActions {
    public request() {
        return {
            type: ActionType.CLEAR_ERRORS
        };
    }
}

export default new ClearErrorActions();
