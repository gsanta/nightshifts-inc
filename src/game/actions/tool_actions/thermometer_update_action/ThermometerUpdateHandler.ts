import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ThermometerTool } from '../../../tools/ThermometerTool';
import { Room } from '../../../world/world_items/item_types/Room';
import { ActionHandler } from '../../ActionHandler';

export class ThermometerUpdateHandler implements ActionHandler {
    private prevRoom: Room;

    public handle(type: string, world: World, room: Room) {
        switch (type) {
            case GameActionType.ENTER_ROOM:
                (<ThermometerTool> world.tools[0]).updateTemperature(room.temperature);

                break;
            default:
                break;
        }
    }
}
