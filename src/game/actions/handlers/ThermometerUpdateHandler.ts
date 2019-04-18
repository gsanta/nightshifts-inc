import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ThermometerToolMesh } from '../../../engine/tools/ThermometerToolMesh';
import { Room } from '../../../engine/world_items/Room';

export class ThermometerUpdateHandler implements ActionHandler {
    private prevRoom: Room;

    public handle(type: string, world: World, room: Room) {
        switch (type) {
            case GameActionType.ENTER_ROOM:
                (<ThermometerToolMesh> world.tools[0]).updateTemperature(room.temperature);

                break;
            default:
                break;
        }
    }
}
