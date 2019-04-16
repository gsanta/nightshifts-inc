import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ThermometerToolMesh } from '../../../engine/tools/ThermometerToolMesh';
import { Room } from '../../../engine/world_items/Room';

export class ThermometerUpdateHandler implements ActionHandler {
    private prevRoom: Room;

    public sendAction(type: string, world: World) {
        switch (type) {
            case GameActionType.MOVE:
                this.updateTehrmometerColor(world);
                break;
            default:
                break;
        }
    }

    private updateTehrmometerColor(world: World) {
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

        const intersectingRoom = <Room> rooms.filter(room => room.mesh.wrappedMesh.intersectsMesh(world.player.mesh.wrappedMesh))[0];

        if (intersectingRoom !== this.prevRoom) {
            (<ThermometerToolMesh> world.tools[0]).updateTemperature(intersectingRoom.temperature);
            this.prevRoom = intersectingRoom;
        }
    }
}
