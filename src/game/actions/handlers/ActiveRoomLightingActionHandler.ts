import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { WorldItem } from '../../world_items/WorldItem';
import { Room } from '../../world_items/room/Room';
import _ = require('lodash');
import { Mesh } from 'babylonjs';
import { DefaultWall } from '../../world_items/DefaultWall';
import { Door } from '../../world_items/Door';
import { Window } from '../../world_items/Window';
import { Border } from '../../world_items/Border';
import { GameActionType } from '../GameActionType';

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
