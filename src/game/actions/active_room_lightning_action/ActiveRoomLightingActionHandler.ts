import { World } from '../../world/World';
import { Room } from '../../world/world_items/room/Room';
import _ = require('lodash');
import { GameActionType } from '../GameActionType';
import { ActionHandler } from '../ActionHandler';
import { LightHandler } from './LightHandler';

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
                this.handleGameIsReady(world);
                return;
            case GameActionType.ENTER_ROOM:
                this.handleEnterRoom(activeRoom, world);
                return;
            case GameActionType.TURN_ON_ALL_LIGHTS:
                this.handleTurnOnAllLights(world);
                return;
            case GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS:
                this.handleTurnOffLightsForNotActiveRoom(world);
                return;
            default:
                return;
        }
    }

    private handleEnterRoom(activeRoom: Room, world: World) {
        this.lightHandler.enableLight(activeRoom, world);

        if (this.prevActiveRoom) {
            this.lightHandler.disableLight(this.prevActiveRoom, world);
        }

        this.prevActiveRoom = activeRoom;
    }

    private handleGameIsReady(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightHandler.disableLight(<Room> room, world);
        });
    }

    private handleTurnOnAllLights(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightHandler.enableLight(<Room> room, world);
        });
    }

    private handleTurnOffLightsForNotActiveRoom(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            if ((<Room> room).isActive) {
                this.prevActiveRoom = <Room> room;
                this.lightHandler.enableLight(<Room> room, world);
            } else {
                this.lightHandler.disableLight(<Room> room, world);
            }
        });
    }
}
