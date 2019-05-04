import { World } from '../../../world/World';
import { Room } from '../../../world/world_items/room/Room';
import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { NormalLightSwitcher } from './NormalLightSwitcher';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private static instance: ActiveRoomLightingActionHandler;

    private prevActiveRoom: Room;
    private lightHandler: NormalLightSwitcher;

    private constructor() {
        this.lightHandler = new NormalLightSwitcher();
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
        if (activeRoom.lampBehaviour === 'onWhenActive') {
            this.handleOnWhenActiveLampBehaviour(activeRoom, world);
        } else if (activeRoom.lampBehaviour === 'flashesWhenEntering') {
            this.handleFlashesWhenEnteringLampBehaviour(activeRoom, world);
        }

        if (this.prevActiveRoom) {
            this.lightHandler.off(this.prevActiveRoom, world);
        }

        this.prevActiveRoom = activeRoom;
    }

    private handleOnWhenActiveLampBehaviour(activeRoom: Room, world: World) {
        this.lightHandler.on(activeRoom, world);
    }

    private handleFlashesWhenEnteringLampBehaviour(activeRoom: Room, world: World) {
        this.lightHandler.on(activeRoom, world);

        setTimeout(() => {
            this.lightHandler.off(activeRoom, world);
        }, 150);
    }

    private handleGameIsReady(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightHandler.off(<Room> room, world);
        });
    }

    private handleTurnOnAllLights(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightHandler.on(<Room> room, world);
        });
    }

    private handleTurnOffLightsForNotActiveRoom(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            if ((<Room> room).isActive) {
                this.prevActiveRoom = <Room> room;
                this.lightHandler.on(<Room> room, world);
            } else {
                this.lightHandler.off(<Room> room, world);
            }
        });
    }
}
