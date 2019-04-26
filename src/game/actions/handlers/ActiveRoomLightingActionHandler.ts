import { World } from '../../world/World';
import { Room } from '../../world/world_items/room/Room';
import _ = require('lodash');
import { GameActionType } from '../GameActionType';
import { ActionHandler } from '../ActionHandler';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private prevActiveRoom: Room;

    public handle(type: string, world: World, activeRoom: Room) {

        switch (type) {
            case GameActionType.ENTER_ROOM:

                activeRoom.makeActive();

                if (this.prevActiveRoom) {
                    this.prevActiveRoom.makeInactive();
                }

                this.prevActiveRoom = activeRoom;
                return;
            default:
                return;
        }
    }
}
