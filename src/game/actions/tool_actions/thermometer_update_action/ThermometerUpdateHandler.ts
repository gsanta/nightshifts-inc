import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ThermometerTool } from '../../../tools/ThermometerTool';
import { ActionHandler } from '../../ActionHandler';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';

export class ThermometerUpdateHandler implements ActionHandler {

    public handle(type: string, world: World, room: WorldItem) {
        switch (type) {
            case GameActionType.ENTER_ROOM:
                (<ThermometerTool> world.tools[0]).updateTemperature(room.temperature);

                break;
            default:
                break;
        }
    }
}
