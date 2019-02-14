import { ActionType } from '../../ActionType';

class ClearErrorActions {
    public request() {
        return {
            type: ActionType.CLEAR_ERRORS
        };
    }
}

export default new ClearErrorActions();
