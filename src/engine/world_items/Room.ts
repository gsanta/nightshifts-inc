import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { MeshWrapper } from '../wrappers/MeshWrapper';
import { Polygon, GwmWorldItem } from 'game-worldmap-generator';
import { Scene, Vector3 } from 'babylonjs';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { World } from '../../game/model/World';
import { BabylonMeshWrapper } from '../wrappers/babylon/BabylonMeshWrapper';

export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];
    public mesh: MeshWrapper<any>;
    public name: string;
    private boundingPolygon: Polygon;

    constructor(mesh: MeshWrapper<any>, boundingPolygon: Polygon, name: string) {
        super([]);
        this.name = name;
        this.mesh = mesh;
        this.boundingPolygon = boundingPolygon;
    }

    public addBorderItem(worldItem: WorldItem) {
        this.borderItems.push(worldItem);
    }

    public getBoundingPolygon(): Polygon {
        return this.boundingPolygon;
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Room {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = gwmWorldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const room = BABYLON.MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            scene
        );


        return new Room(new BabylonMeshWrapper(room), dimensions, 'room');
    }
}
