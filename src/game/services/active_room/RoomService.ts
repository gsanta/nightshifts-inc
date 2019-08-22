import { GameObject } from '../../model/game_objects/GameObject';
import { World } from '../../model/game_objects/World';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import _ from 'lodash';
import { Polygon } from '@nightshifts.inc/geometry';
import { Room } from '../../model/game_objects/Room';

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
                this.turnOffLight(prevActiveRoom);
                prevActiveRoom.displayRoof();
            }

            if (newActiveRoom) {
                this.turnOnLight(newActiveRoom);
                this.activeRoom = newActiveRoom;
                this.activeRoom.isActive = true;
                newActiveRoom.hideRoof();
            }
        }
    }

    private turnOffLight(room: Room) {
        room.isActive = false;
        this.lightSwitcher.off(<Room> room, this.world);
    }

    private turnOnLight(room: Room) {
        this.lightSwitcher.on(<Room> room, this.world);
    }
}
