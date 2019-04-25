import { GwmWorldItem, Rectangle, Polygon } from 'game-worldmap-generator';
import { Scene, StandardMaterial, MeshBuilder } from 'babylonjs';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { SimpleWorldItem } from '../SimpleWorldItem';
import { WorldItem } from '../WorldItem';
import { VectorModel } from '../../model/core/VectorModel';
import { Door } from '../Door';


export class DividerWorldItemFactory {
    private scene: Scene;
    private dimensions: Vector2Model;
    private material: StandardMaterial;
    private meshBuilder: typeof MeshBuilder;

    constructor(scene: Scene, meshBuilder: typeof MeshBuilder, dimensions: Vector2Model, material: StandardMaterial) {
        this.scene = scene;
        this.dimensions = dimensions;
        this.material = material;
        this.meshBuilder = meshBuilder;
    }

    create(gwmWorldItem: GwmWorldItem): WorldItem {
        const translateX = - (this.dimensions.x() / 2);
        const translateY = - (this.dimensions.y() / 2);

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.translate(new Point(translateX, translateY));

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.stretchY(-0.75);

        const container = this.createContainerItem(gwmWorldItem);
        const [side1, side2] = this.createSideItems(container, gwmWorldItem);

        const door = new Door(container, side1, side2);
        door.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingCenter().x, 2.5, -gwmWorldItem.dimensions.getBoundingCenter().y));
        this.setPivotMatrix(gwmWorldItem, door);
        return door;
    }

    private createSideItems(container: WorldItem, gwmWorldItem: GwmWorldItem): [WorldItem, WorldItem] {
        const [dimension1, dimension2] = (<Rectangle> gwmWorldItem.dimensions).cutToEqualHorizontalSlices(1, true);

        const side1 = this.createSideItem(container, dimension1, `${name}-side-1`);
        const side2 = this.createSideItem(container, dimension2, `${name}-side-2`);

        return [side1, side2];
    }

    private createSideItem(container: WorldItem, dimension: Polygon, name: string): WorldItem {
        const mesh = this.meshBuilder.CreateBox(
            name,
            { width: dimension.width, depth: dimension.height, height: 5 },
            this.scene
        );

        mesh.parent = container.mesh;
        mesh.material = this.material;

        const item = new SimpleWorldItem(mesh, name);

        item.translate(new VectorModel(dimension.left, 0, dimension.top));

        return item;
    }

    private createContainerItem(gwmWorldItem: GwmWorldItem) {
        const mesh = this.meshBuilder.CreateBox(
            `${gwmWorldItem.name}-container`,
            { width: gwmWorldItem.dimensions.width, depth: gwmWorldItem.dimensions.height, height: 5 },
            this.scene
        );
        mesh.isVisible = false;

        return new SimpleWorldItem(mesh, `${gwmWorldItem.name}-container`);
    }

    private setPivotMatrix(worldItem: GwmWorldItem, door: Door) {
        const angle = worldItem.additionalData.angle;
        const xExtent = door.containerMesh.getBoundingInfo().boundingBox.extendSize.x;
        door.setPivot(new VectorModel(xExtent, 0, 0), angle);
    }
}
