import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ActionDispatcher } from '../../ActionDispatcher';
import { ActionHandler } from '../../ActionHandler';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';


export class EnterRoomActionHandler implements ActionHandler {
    private prevRoom: WorldItem;
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

    private getActiveRoom(world: World): WorldItem {
        const rooms = world.worldItems.filter(gameObj => gameObj.type === 'room');

        return rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];
    }
}
