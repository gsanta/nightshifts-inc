
import { RoomState } from './RoomState';
import { StandardMaterial } from 'babylonjs';
import { Room } from './Room';
import { World } from '../../World';
import { LightHandler } from './LightHandler';
import { ActiveRoomState } from './ActiveRoomState';
import { ReservedRoomState } from './ReservedRoomState';


export class InactiveRoomState extends RoomState {
    private doorMaterial: StandardMaterial;

    private world: World;
    private lightHandler: LightHandler;

    private constructor(world: World) {
        super();

        this.world = world;
        this.lightHandler = new LightHandler();
        this.doorMaterial = world.materials.door;
    }

    public static getInstance(world: World): InactiveRoomState {
        return new InactiveRoomState(world);
    }

    public makeInactive(room: Room): RoomState {
        // throw new Error();
        return this;
    }

    public canGoInactive(): boolean {
        return false;
    }


    public makeReserved(room: Room): RoomState {
        const newState = ReservedRoomState.getInstance(this.world);
        newState.activate(room);

        return newState;
        // return this;
    }

    public canGoReserved(): boolean {
        return true;
    }

    public makeActive(room: Room): RoomState {
        const newState = ActiveRoomState.getInstance(this.world);
        newState.activate(room);

        return newState;
        // return this;
    }

    public canGoActive(): boolean {
        return false;
    }

    public activate(room: Room) {
        this.disableLightForRoom(room);
        room.getDoors().forEach(door => door.setMaterial(this.doorMaterial));
    }

    public canRoomTransitionToThis(room: Room): boolean {
        if (room.state instanceof ReservedRoomState || room.state instanceof ActiveRoomState) {
            return true;
        }

        return false;
    }

    private disableLightForRoom(room: Room) {
        const items = [room, ...room.children, ...room.neighbours];

        // items.forEach(item => this.lightHandler.disableLight(item));
    }
}
