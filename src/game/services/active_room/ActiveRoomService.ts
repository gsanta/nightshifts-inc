import { GameObject } from '../../model/game_objects/GameObject';
import { World } from '../../model/game_objects/World';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import _ from 'lodash';
import { Polygon } from '@nightshifts.inc/geometry';
import { Room } from '../../model/game_objects/Room';

export class ActiveRoomService {
    private world: World;
    private rooms: GameObject[];
    private activeRoom: GameObject;

    private lightSwitcher: NormalLightSwitcher;
    public isShowRoofs = true;

    constructor(world: World) {
        this.world = world;
        this.rooms = world.getWorldItemsByType('room');
        this.lightSwitcher = new NormalLightSwitcher();

        world.getWorldItemsByType('room').forEach(room => this.lightSwitcher.off(<Room> room, world));

        this.updateActiveRoom();
    }


    public updateActiveRoom() {
        const newActiveRoom = this.rooms.find(room => (<Polygon> room.boundingBox).intersect(<Polygon> this.world.player.boundingBox));
        const prevActiveRoom = this.activeRoom;

        if (newActiveRoom !== prevActiveRoom) {
            if (prevActiveRoom) {
                this.turnOffLight(prevActiveRoom);
                this.displayRoof(prevActiveRoom);
            }

            if (newActiveRoom) {
                this.turnOnLight(newActiveRoom);
                this.activeRoom = newActiveRoom;
                this.activeRoom.isActive = true;
                this.hideRoof(newActiveRoom);
            }
        }
    }

    private turnOffLight(room: GameObject) {
        room.isActive = false;
        this.lightSwitcher.off(<Room> room, this.world);
    }

    private turnOnLight(room: GameObject) {
        this.lightSwitcher.on(<Room> room, this.world);
    }

    private displayRoof(room: GameObject) {
        room.meshes[1].isVisible = true;
    }

    private hideRoof(room: GameObject) {
        room.meshes[1].isVisible = false;
    }
}
