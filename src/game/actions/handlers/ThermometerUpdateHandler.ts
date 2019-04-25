import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ThermometerToolMesh } from '../../tools/ThermometerToolMesh';
import { Room } from '../../world_items/room/Room';
import { ActionHandler } from '../ActionHandler';

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
