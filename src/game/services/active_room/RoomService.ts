import { GameObject } from '../../model/game_objects/GameObject';
import { World } from '../../model/game_objects/World';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import _ from 'lodash';
import { Polygon } from '@nightshifts.inc/geometry';
import { Room } from '../../model/game_objects/Room';
import { VectorUtils } from '../../model/utils/VectorUtils';

export class RoomService {
    private world: World;
    private activeRoom: Room;

    private lightSwitcher: NormalLightSwitcher;
    public isShowRoofs = true;

    constructor(world: World) {
        this.world = world;
        this.lightSwitcher = new NormalLightSwitcher();

        world.rooms.forEach(room => this.lightSwitcher.off(<Room> room, world));

        this.updateActiveRoom();
    }


    public updateActiveRoom() {
        const newActiveRoom = this.world.rooms.find(room => (<Polygon> room.boundingBox).intersect(<Polygon> this.world.player.boundingBox));
        const prevActiveRoom = this.activeRoom;

        if (newActiveRoom !== prevActiveRoom) {
            if (prevActiveRoom) {
                this.leaveRoom(prevActiveRoom);
            }

            if (newActiveRoom) {
                this.enterRoom(newActiveRoom);
            }
        }
    }

    private leaveRoom(room: Room) {
        this.turnOffLight(room);
        room.displayRoof();
    }

    private enterRoom(room: Room) {
        if (room.lightsWorking) {
            this.turnOnLight(room);
        }
        this.world.roomLight.position = VectorUtils.pointToVector(room.boundingBox.getBoundingCenter(), 10);
        this.activeRoom = room;
        this.activeRoom.isActive = true;
        room.hideRoof();
    }

    private turnOffLight(room: Room) {
        room.isActive = false;
        // room.switchLights(false);
        // this.lightSwitcher.off(<Room> room, this.world);
    }

    private turnOnLight(room: Room) {
        // room.switchLights(true);
        // this.lightSwitcher.on(<Room> room, this.world);
    }
}
