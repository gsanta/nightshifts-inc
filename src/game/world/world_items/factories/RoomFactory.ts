import { Scene, MeshBuilder, Vector3, PhysicsImpostor } from '@babylonjs/core';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { Point, Polygon, Shape } from '@nightshifts.inc/geometry';
import { RoomLabelFactory } from './RoomLabelFactory';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';

export class RoomFactory {
    private scene: Scene;
    private roomLabelFactory: RoomLabelFactory;
    private counter = 1;

    constructor(scene: Scene) {
        this.scene = scene;
        this.roomLabelFactory = new RoomLabelFactory(scene);
    }

    public createItem(worldItem: WorldItemInfo, world: World): SimpleWorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = worldItem.dimensions
            .negate('y')
            .translate(new Point(translateX, -translateY));

        const mesh = this.createRoomFloor(dimensions);
        mesh.receiveShadows = true;

        const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.PlaneImpostor, { mass: 0, friction: 1, restitution: 0.7 }, this.scene);
        mesh.physicsImpostor = impostor;
        mesh.isVisible = true;


        const label = `room-${this.counter++}`;
        const roomLabel = this.roomLabelFactory.createItem(dimensions, world, label);
        roomLabel.setVisible(false);

        const room = new SimpleWorldItem(mesh, dimensions, {type: 'room'});
        room.label = label;
        room.children.push(roomLabel);
        return room;
    }

    private createRoomFloor(dimensions: Shape) {
        return MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.getPoints().map(point => new Vector3(point.x, 2, point.y)),
                depth: 0.5,
                updatable: true
            },
            this.scene
        );
    }
}
