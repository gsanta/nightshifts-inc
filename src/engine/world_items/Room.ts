import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { Polygon, GwmWorldItem } from 'game-worldmap-generator';
import { Scene, Vector3, Mesh } from 'babylonjs';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { World } from '../../game/model/World';
import { Door } from '../../game/model/creature/type/Door';
import { RoomState } from './room/RoomState';
import { InactiveRoomState } from './room/InactiveRoomState';

export class Room extends ContainerWorldItem {
    public state: RoomState;
    public borderItems: WorldItem[] = [];
    public mesh: Mesh;
    public name: string;
    private boundingPolygon: Polygon;
    public temperature = 20 + Math.floor(Math.random() * 10);

    constructor(mesh: Mesh, boundingPolygon: Polygon, name: string) {
        super([]);
        this.name = name;
        this.mesh = mesh;
        this.boundingPolygon = boundingPolygon;
    }

    public getAllMeshes(): Mesh[] {
        return [this.mesh, ...super.getAllMeshes()];
    }

    public getBoundingPolygon(): Polygon {
        return this.boundingPolygon;
    }

    public getDoors(): Door[] {
        return <Door[]> this.borderItems.filter(child => child instanceof Door);
    }

    public makeInactive() {
        this.state = this.state.makeInactive(this);
    }

    public canGoInactive(): boolean {
        return this.state.canGoInactive();
    }

    public makeReserved() {
        this.state = this.state.makeReserved(this);
    }

    public canGoReserved(): boolean {
        return this.state.canGoReserved();
    }

    public makeActive() {
        this.state = this.state.makeActive(this);
    }

    public canGoActive(): boolean {
        return this.state.canGoActive();
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Room {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = gwmWorldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const roomMesh = BABYLON.MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            scene
        );


        const room = new Room(roomMesh, dimensions, 'room');
        room.state = InactiveRoomState.getInstance(world);
        room.state.activate(room);
        return room;
    }
}
