import { World } from '../../../world/World';
import { Room } from '../../../world/world_items/room/Room';
import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import { FlashingLightSwitcher } from './FlashingLightSwitcher';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private static instance: ActiveRoomLightingActionHandler;

    private prevActiveRoom: Room;
    private lightSwitcher: NormalLightSwitcher;
    private flashingLightSwitcher: FlashingLightSwitcher;

    private constructor() {
        this.lightSwitcher = new NormalLightSwitcher();
        this.flashingLightSwitcher = new FlashingLightSwitcher(this.lightSwitcher);
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
            this.lightSwitcher.on(activeRoom, world);
        } else if (activeRoom.lampBehaviour === 'flashesWhenEntering') {
            this.flashingLightSwitcher.on(activeRoom, world)
                .then(() => this.lightSwitcher.off(activeRoom, world));
        }

        if (this.prevActiveRoom) {
            this.lightSwitcher.off(this.prevActiveRoom, world);
        }

        this.prevActiveRoom = activeRoom;
    }

    private handleGameIsReady(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightSwitcher.off(<Room> room, world);
        });
    }

    private handleTurnOnAllLights(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightSwitcher.on(<Room> room, world);
        });
    }

    private handleTurnOffLightsForNotActiveRoom(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            if ((<Room> room).isActive) {
                this.prevActiveRoom = <Room> room;
                this.lightSwitcher.on(<Room> room, world);
            } else {
                this.lightSwitcher.off(<Room> room, world);
            }
        });
    }
}
