import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { MeshWrapper } from '../wrappers/MeshWrapper';
import { Polygon, GwmWorldItem } from 'game-worldmap-generator';
import { Scene, Vector3 } from 'babylonjs';
import { Vector2Model } from '../../game/model/utils/Vector2Model';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { World } from '../../game/model/World';
import { VectorModel, toVector3 } from '../../game/model/core/VectorModel';
import { BabylonMeshWrapper } from '../wrappers/babylon/BabylonMeshWrapper';

export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];
    public mesh: MeshWrapper<any>;
    public name: string;
    private boundingPolygon: Polygon;

    constructor(mesh: MeshWrapper<any>, name: string) {
        super([]);
        this.name = name;
        this.mesh = mesh;
    }

    public addBorderItem(worldItem: WorldItem) {
        this.borderItems.push(worldItem);
    }

    public getBoundingPolygon(): Polygon {
        return null;
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Room {
        let topLeft = new Vector2Model(gwmWorldItem.dimensions.points[0].x, gwmWorldItem.dimensions.points[0].y);

        const dimensions  = gwmWorldItem.dimensions
            .translate(new Point(- topLeft.x(), -topLeft.y()))
            .negateY();

        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);
        topLeft = topLeft.add(new Vector2Model(translateX, translateY));

        const translate = new VectorModel(topLeft.x(), 0, -topLeft.y());

        const room = BABYLON.MeshBuilder.CreatePolygon(
            'room',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            scene
        );

        room.translate(toVector3(translate), 1);

        return new Room(new BabylonMeshWrapper(room), 'room');
    }
}
