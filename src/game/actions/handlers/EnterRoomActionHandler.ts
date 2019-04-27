import { Room } from '../../world/world_items/room/Room';
import { World } from '../../world/World';
import { GameActionType } from '../GameActionType';
import { ActionDispatcher } from '../ActionDispatcher';
import { ActionHandler } from '../ActionHandler';


export class EnterRoomActionHandler implements ActionHandler {
    private prevRoom: Room;
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.NEXT_TICK:
                this.dispatchEventIfRoomChanged(world);
                break;
            default:
                break;
        }
    }

    private dispatchEventIfRoomChanged(world: World) {
        const rooms = world.worldItems.filter(gameObj => gameObj.name === 'room');

        const intersectingRoom = <Room> rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];

        if (intersectingRoom !== this.prevRoom) {
            this.prevRoom = intersectingRoom;
            this.actionDispatcher.dispatch(GameActionType.ENTER_ROOM, intersectingRoom);
        }
    }
}
