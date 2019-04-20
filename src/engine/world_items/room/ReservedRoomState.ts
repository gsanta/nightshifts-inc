
import { RoomState } from './RoomState';
import { StandardMaterial } from 'babylonjs';
import { Room } from '../Room';
import { World } from '../../../game/model/World';
import { LightHandler } from './LightHandler';
import { ActiveRoomState } from './ActiveRoomState';
import { InactiveRoomState } from './InactiveRoomState';


export class ReservedRoomState extends RoomState {
    private doorMaterial: StandardMaterial;

    private room: Room;
    private world: World;
    private lightHandler: LightHandler;

    constructor(world: World) {
        super();

        this.world = world;
        this.lightHandler = new LightHandler(world.hemisphericLight);
        this.doorMaterial = world.materials.doorClosed;
    }

    public activate() {
        this.disableLightForRoom();
        this.room.getDoors().forEach(door => door.setMaterial(this.doorMaterial));
    }

    public canRoomTransitionToThis(room: Room): boolean {
        if (room.state instanceof InactiveRoomState) {
            return true;
        }

        return false;
    }

    private disableLightForRoom() {
        const items = [this.room, ...this.room.children];

        items.forEach(item => this.lightHandler.disableLight(item));
    }
}
