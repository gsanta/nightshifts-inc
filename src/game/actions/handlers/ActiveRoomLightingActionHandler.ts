import { World } from '../../world/World';
import { Room } from '../../world/world_items/room/Room';
import _ = require('lodash');
import { GameActionType } from '../GameActionType';
import { ActionHandler } from '../ActionHandler';
import { LightHandler } from '../../world/world_items/room/LightHandler';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private prevActiveRoom: Room;
    private lightHandler: LightHandler;

    constructor(lightHandler: LightHandler) {
        this.lightHandler = lightHandler;
    }

    public handle(type: string, world: World, activeRoom: Room) {

        switch (type) {
            case GameActionType.ENTER_ROOM:

                this.lightHandler.enableLight(activeRoom);

                if (this.prevActiveRoom) {
                    this.lightHandler.disableLight(this.prevActiveRoom);
                }

                this.prevActiveRoom = activeRoom;
                return;

            case GameActionType.TURN_ON_ALL_LIGHTS:
                world.getWorldItemsByName('room').forEach(room => {
                    this.lightHandler.enableLight(room);
                });
                return;
            default:
                return;
        }
    }


}
