import { RoomState } from './RoomState';
import { StandardMaterial } from 'babylonjs';
import { Room } from './Room';
import { World } from '../../World';
import { LightHandler } from './LightHandler';
import { InactiveRoomState } from './InactiveRoomState';


export class ActiveRoomState extends RoomState {
    private doorMaterial: StandardMaterial;

    private world: World;
    private lightHandler: LightHandler;

    private constructor(world: World) {
        super();

        this.world = world;
        // this.lightHandler = new LightHandler(world.hemisphericLight);
        this.doorMaterial = world.materials.door;
    }

    public static getInstance(world: World): ActiveRoomState {
        return new ActiveRoomState(world);
    }


    public makeInactive(room: Room): RoomState {
        const newState = InactiveRoomState.getInstance(this.world);
        newState.activate(room);

        return newState;    }

    public canGoInactive(): boolean {
        return true;
    }


    public makeReserved(room: Room): RoomState {
        throw new Error();
    }

    public canGoReserved(): boolean {
        return false;
    }

    public makeActive(room: Room): RoomState {
        throw new Error();
    }

    public canGoActive(): boolean {
        return false;
    }

    public activate(room: Room) {
        this.enableLightForRoom(room);
        room.getDoors().forEach(door => door.setMaterial(this.doorMaterial));
    }

    public canRoomTransitionToThis(room: Room): boolean {
        if (room.state instanceof InactiveRoomState) {
            return true;
        }

        return false;
    }

    private enableLightForRoom(room: Room) {
        const items = [room, ...room.children, ...room.neighbours];

        // items.forEach(item => this.lightHandler.enableLight(item));
    }
}
