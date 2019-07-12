import { WorldItem } from '../world/world_items/item_types/WorldItem';
import { Vector3 } from '@babylonjs/core';
import { World } from '../world/World';
import { NormalLightSwitcher } from './environment_actions/active_room_lightning_action/NormalLightSwitcher';
import { FlashingLightSwitcher } from './environment_actions/active_room_lightning_action/FlashingLightSwitcher';
import _ from 'lodash';

export class ActiveRoomService {
    private world: World;
    private rooms: WorldItem[];
    private activeRoom: WorldItem;

    private lightSwitcher: NormalLightSwitcher;
    private flashingLightSwitcher: FlashingLightSwitcher;
    public isShowRoofs = true;

    constructor(world: World) {
        this.world = world;
        this.rooms = world.getWorldItemsByName('room');
        this.lightSwitcher = new NormalLightSwitcher();
        this.flashingLightSwitcher = new FlashingLightSwitcher(this.lightSwitcher);
    }


    public calcActiveRoomAtPoint(point: Vector3) {
        const newActiveRoom = this.getActiveRoomAtPoint(point);

        if (newActiveRoom && newActiveRoom !== this.activeRoom) {
            if (this.activeRoom) {
                this.turnOffLight(this.activeRoom)
            }
            this.turnOnLight(newActiveRoom);
            this.activeRoom = newActiveRoom;
            this.activeRoom.isActive = true;
            if (this.isShowRoofs) {
                this.handleShowRoomLabels(this.world);
            }
        }
    }

    private turnOffLight(room: WorldItem) {
        room.isActive = false;
        this.lightSwitcher.off(room, this.world);
    }

    private turnOnLight(room: WorldItem) {
        if (room.lampBehaviour === 'onWhenActive') {
            this.lightSwitcher.on(room, this.world);
        } else if (room.lampBehaviour === 'flashesWhenEntering') {
            this.flashingLightSwitcher.on(room, this.world)
                .then(() => this.lightSwitcher.off(room, this.world));
        }
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

    private deactivatePrevActiveRoom() {
        this.rooms.filter(room => room.isActive).forEach(room => room.isActive = false);
    }

    private getActiveRoomAtPoint(point: Vector3): WorldItem {
        return this.rooms.find(room => room.mesh.intersectsPoint(point));
    }
}