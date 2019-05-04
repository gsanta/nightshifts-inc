import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { Room } from '../../../world/world_items/room/Room';


export class LampBehaviourActionHandler implements ActionHandler {
    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                (<Room> world.getWorldItemsByName('room')[2]).lampBehaviour = 'flashesWhenEntering';
                break;
            default:
                break;
        }
    }
}
