import { World } from '../../world/World';
import { Room } from '../../world/world_items/room/Room';
import _ = require('lodash');
import { GameActionType } from '../GameActionType';
import { ActionHandler } from '../ActionHandler';
import { LightHandler } from '../../world/world_items/room/LightHandler';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private static instance: ActiveRoomLightingActionHandler;

    private prevActiveRoom: Room;
    private lightHandler: LightHandler;

    private constructor() {
        this.lightHandler = new LightHandler();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ActiveRoomLightingActionHandler();
        }

        return this.instance;
    }

    public handle(type: string, world: World, activeRoom: Room) {

        switch (type) {
            case GameActionType.GAME_IS_READY:
                world.getWorldItemsByName('room').forEach(room => {
                    this.lightHandler.disableLight(<Room> room, world);
                });
                return;
            case GameActionType.ENTER_ROOM:

                this.lightHandler.enableLight(activeRoom, world);

                if (this.prevActiveRoom) {
                    this.lightHandler.disableLight(this.prevActiveRoom, world);
                }

                this.prevActiveRoom = activeRoom;
                return;
            case GameActionType.TURN_ON_ALL_LIGHTS:
                world.getWorldItemsByName('room').forEach(room => {
                    this.lightHandler.enableLight(<Room> room, world);
                });
                return;
            case GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS:
                world.getWorldItemsByName('room').forEach(room => {
                    if ((<Room> room).isActive) {
                        this.lightHandler.enableLight(<Room> room, world);
                    } else {
                        this.lightHandler.disableLight(<Room> room, world);
                    }
                });
                return;
            default:
                return;
        }
    }
}
