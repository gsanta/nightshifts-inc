import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { Scene, StandardMaterial, MeshBuilder, Matrix, Mesh, Vector3 } from '@babylonjs/core';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon, Point, GeometryUtils } from '@nightshifts.inc/geometry';
import { Segment } from '@nightshifts.inc/geometry/build/shapes/Segment';


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

    create(gwmWorldItem: WorldItemInfo): WorldItem {
        const translateX = - (this.dimensions.x() / 2);
        const translateY = - (this.dimensions.y() / 2);

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.translate(new Point(translateX, translateY));

        // gwmWorldItem.dimensions = gwmWorldItem.dimensions.stretchY(-0.75);
        gwmWorldItem.dimensions = gwmWorldItem.dimensions.mirrorY();

        const mesh = this.createMesh(gwmWorldItem);
        const [side1, side2] = this.createSideItems(gwmWorldItem);
        side1.parent = mesh;
        side2.parent = mesh;

        const door = new SimpleWorldItem(mesh, gwmWorldItem.dimensions, {type: 'door'});
        // door.setBoudingBox(gwmWorldItem.dimensions);
        door.translate(new VectorModel(0, 2.5, 0));
        // door.addChild(side1);
        // door.addChild(side2);

        door.mesh.computeWorldMatrix(true);
        side1.computeWorldMatrix(true);
        side2.computeWorldMatrix(true);

        this.setPivotMatrix(door);
        return door;
    }

    private createSideItems(gwmWorldItem: WorldItemInfo): [Mesh, Mesh] {
        // const [dimension1, dimension2] = gwmWorldItem.dimensions.cutToEqualHorizontalSlices(1, true);

        const segment = <Segment> gwmWorldItem.dimensions;

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        const [parallelEdge1, parallelEdge2] = rectangle.getEdges().filter(edge => edge.getSlope() === segment.getSlope());

        const dimension1 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge1, segment);
        const dimension2 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge2, segment);

        const side1 = this.createSideItem(dimension1, `${name}-side-1`);
        const side2 = this.createSideItem(dimension2, `${name}-side-2`);

        side1.translate(new Vector3(dimension1.getBoundingCenter().x, 0, dimension1.getBoundingCenter().y), 1);
        side2.translate(new Vector3(dimension2.getBoundingCenter().x, 0, dimension2.getBoundingCenter().y), 1);

        return [side1, side2];
    }

    private createSideItem(dimension: Polygon, name: string): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            name,
            { width: dimension.xExtent(), depth: dimension.yExtent(), height: 8 },
            this.scene
        );

        mesh.material = this.material;
        mesh.receiveShadows = true;

        return mesh;
    }

    private createMesh(gwmWorldItem: WorldItemInfo): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            `${gwmWorldItem.name}-container`,
            { width: gwmWorldItem.dimensions.xExtent(), depth: gwmWorldItem.dimensions.yExtent(), height: 8 },
            this.scene
        );
        mesh.isVisible = false;
        return mesh;
    }

    private setPivotMatrix(door: WorldItem) {
        const xExtent = door.mesh.getBoundingInfo().boundingBox.extendSize.x;
        const pivotPoint = new VectorModel(xExtent, 0, 0);
        door.mesh.setPivotMatrix(Matrix.Translation(pivotPoint.x, pivotPoint.y, pivotPoint.z));
    }
}
