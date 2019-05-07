import { Room } from '../../../world/world_items/room/Room';
import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ActionDispatcher } from '../../ActionDispatcher';
import { ActionHandler } from '../../ActionHandler';


export class EnterRoomActionHandler implements ActionHandler {
    private prevRoom: Room;
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.NEXT_TICK:
                const activeRoom = this.getActiveRoom(world);

                if (activeRoom !== this.prevRoom) {
                    if (this.prevRoom) {
                        this.prevRoom.isActive = false;
                    }
                    this.prevRoom = activeRoom;
                    activeRoom.isActive = true;
                    this.actionDispatcher.dispatch(GameActionType.ENTER_ROOM, activeRoom);
                }
                break;
            default:
                break;
        }
    }

    private getActiveRoom(world: World): Room {
        const rooms = world.worldItems.filter(gameObj => gameObj.type === 'room');

        return <Room> rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];
    }
}
