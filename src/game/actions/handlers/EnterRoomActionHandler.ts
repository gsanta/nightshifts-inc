import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { Room } from '../../../engine/world_items/Room';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { ActionDispatcher } from '../../../engine/actions/ActionDispatcher';


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
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

        const intersectingRoom = <Room> rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];

        if (intersectingRoom !== this.prevRoom) {
            this.prevRoom = intersectingRoom;
            this.actionDispatcher.dispatch(GameActionType.ENTER_ROOM, intersectingRoom);
        }
    }
}
