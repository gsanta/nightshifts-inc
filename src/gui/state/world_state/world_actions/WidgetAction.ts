import { ActionType } from '../../ActionType';

class WidgetAction {
    public request(health: number) {
        return {
            type: ActionType.WIDGET_UPDATE,
            health
        };
    }
}

export default new WidgetAction();
