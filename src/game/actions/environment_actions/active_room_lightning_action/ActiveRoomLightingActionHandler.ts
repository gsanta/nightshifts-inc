import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import { FlashingLightSwitcher } from './FlashingLightSwitcher';
import _ from 'lodash';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';


//TODO: better naming needed because now this handles `SHOW_ROOM_NAMES` action also
export class ActiveRoomLightingActionHandler implements ActionHandler {
    private static instance: ActiveRoomLightingActionHandler;

    private prevActiveRoom: WorldItem;
    private lightSwitcher: NormalLightSwitcher;
    private flashingLightSwitcher: FlashingLightSwitcher;
    private isShowCeiling = true;

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

    public handle(type: string, world: World, payload: WorldItem | boolean) {

        switch (type) {
            case GameActionType.GAME_IS_READY:
                this.handleGameIsReady(world);
                return;
            case GameActionType.ENTER_ROOM:
                this.handleEnterRoom(<WorldItem> payload, world);
                if (this.isShowCeiling) {
                    this.handleShowRoomLabels(world);
                }
                return;
            case GameActionType.TURN_ON_ALL_LIGHTS:
                this.handleTurnOnAllLights(world);
                return;
            case GameActionType.TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS:
                this.handleTurnOffLightsForNotActiveRoom(world);
                return;

            case GameActionType.SHOW_ROOM_NAMES:
                if (payload) {
                    this.handleShowRoomLabels(world);
                    this.isShowCeiling = true;
                } else {
                    this.hideCeiling(world);
                    this.isShowCeiling = false;
                }
                return;
            default:
                return;
        }
    }

    private hideCeiling(world: World) {
        world.getWorldItemsByName('room')
            .forEach((room: WorldItem) => {
                room.getChildren().filter(child => child.type === 'room-label').forEach(roomLabel => roomLabel.setVisible(false));
            });
    }

    private showCeiling(world: World) {
        world.getWorldItemsByName('room')
        .forEach((room: WorldItem) => {
            room.getChildren().filter(child => child.type === 'room-label').forEach(roomLabel => roomLabel.setVisible(true));
        });
    }

    private handleShowRoomLabels(world: World) {
        const rooms = <WorldItem[]> world.getWorldItemsByName('room');
        const activeRoom = _.find(rooms, room => room.isActive);
        _.chain(world.getWorldItemsByName('room'))
            .without(activeRoom)
            .forEach((room: WorldItem) => {
                room.getChildren().filter(child => child.type === 'room-label').forEach(roomLabel => roomLabel.setVisible(true));
            })
            .value();

        activeRoom.getChildren().filter(child => child.type === 'room-label').forEach(roomLabel => roomLabel.setVisible(false));
    }

    private handleEnterRoom(activeRoom: WorldItem, world: World) {
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
            this.lightSwitcher.off(<WorldItem> room, world);
        });
    }

    private handleTurnOnAllLights(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            this.lightSwitcher.on(<WorldItem> room, world);
        });
    }

    private handleTurnOffLightsForNotActiveRoom(world: World) {
        world.getWorldItemsByName('room').forEach(room => {
            if ((<WorldItem> room).isActive) {
                this.prevActiveRoom = <WorldItem> room;
                this.lightSwitcher.on(<WorldItem> room, world);
            } else {
                this.lightSwitcher.off(<WorldItem> room, world);
            }
        });
    }
}
