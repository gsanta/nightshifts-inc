import { ActionType } from '../../ActionType';
import { World } from '../../../../game/world/World';
import { ServiceFacade } from '../../../../game/services/ServiceFacade';

class SetWorldActions {
    public request(world: World, services: ServiceFacade) {
        return {
            type: ActionType.SET_WORLD_REQUEST,
            world,
            services
        };
    }
}

export default new SetWorldActions();
