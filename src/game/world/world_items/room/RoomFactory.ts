import { Scene, MeshBuilder, Vector3, PointLight, StandardMaterial, Color3 } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { ContainerWorldItem } from '../ContainerWorldItem';
import { Room } from './Room';
import { World } from '../../World';
import { Point, Polygon } from '@nightshifts.inc/geometry';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;

export class RoomFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): ContainerWorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = worldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const mesh = this.createRoomFloor(dimensions);
        mesh.receiveShadows = true;

        const roomTopMesh = this.createRoomTop(dimensions);

        const room = new Room(mesh, dimensions, 'room');
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

    private createRoomTop(dimensions: Polygon) {
        const roomTop = MeshBuilder.CreatePolygon(
            'room-top',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 0, point.y)),
                depth: 2,
                updatable: true
            },
            this.scene
        );

        roomTop.translate(new Vector3(0, 5, 0), 1);

        roomTop.material = this.createRoomTopMaterial();

        return roomTop;
    }

    private createRoomTopMaterial(): StandardMaterial {
        const material = new StandardMaterial('door-closed-material', this.scene);
        material.diffuseColor = Color3.FromHexString(colors.doorClosed);

        return material;
    }
}
