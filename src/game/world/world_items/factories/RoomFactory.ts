import { Scene, MeshBuilder, Vector3, PhysicsImpostor } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { ContainerWorldItem } from '../item_types/ContainerWorldItem';
import { Room } from '../item_types/Room';
import { World } from '../../World';
import { Point, Polygon } from '@nightshifts.inc/geometry';
import { GameConstants } from '../../../GameConstants';
import { RoomLabelFactory } from './RoomLabelFactory';
const colors = GameConstants.colors;

export class RoomFactory {
    private scene: Scene;
    private roomLabelFactory: RoomLabelFactory;
    private counter = 1;

    constructor(scene: Scene) {
        this.scene = scene;
        this.roomLabelFactory = new RoomLabelFactory(scene);
    }

    public createItem(worldItem: GwmWorldItem, world: World): ContainerWorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = worldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const mesh = this.createRoomFloor(dimensions);
        mesh.receiveShadows = true;

        const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.PlaneImpostor, { mass: 0, friction: 1, restitution: 0.7 }, this.scene);
        mesh.physicsImpostor = impostor;
        mesh.isVisible = true;

        (window as any).physicsViewer.showImpostor(mesh.physicsImpostor);

        const label = `room-${this.counter++}`;
        const roomLabel = this.roomLabelFactory.createItem(dimensions, world, label);
        roomLabel.setVisible(false);

        const room = new Room(mesh, dimensions, 'room');
        room.label = label;
        room.addChild(roomLabel);
        return room;
    }

    private createRoomFloor(dimensions: Polygon) {
        return MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            this.scene
        );
    }
}
