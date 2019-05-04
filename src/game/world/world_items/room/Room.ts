import { ContainerWorldItem } from '../ContainerWorldItem';
import { WorldItem } from '../WorldItem';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { Scene, Vector3, Mesh, MeshBuilder } from '@babylonjs/core';
import { World } from '../../World';
import { Door } from '../door/Door';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon, Point } from '@nightshifts.inc/geometry';

export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];
    public mesh: Mesh;
    public name: string;
    private boundingPolygon: Polygon;
    public temperature = 20 + Math.floor(Math.random() * 10);
    public isActive: boolean;
    public lampBehaviour: 'offAlways' | 'onAlways' | 'onWhenActive' | 'flashesWhenEntering' = 'onWhenActive';

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

    public getCenterPosition(): VectorModel {
        const center = this.boundingPolygon.getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getDoors(): Door[] {
        return <Door[]> this.borderItems.filter(child => child instanceof Door);
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Room {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = gwmWorldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const roomMesh = MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            scene
        );

        roomMesh.receiveShadows = true;

        const room = new Room(roomMesh, dimensions, 'room');
        return room;
    }
}
