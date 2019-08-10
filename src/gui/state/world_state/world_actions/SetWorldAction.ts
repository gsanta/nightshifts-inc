import { ActionType } from '../../ActionType';
import { World } from '../../../../game/model/game_objects/World';
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
