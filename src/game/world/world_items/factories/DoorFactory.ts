import { Color3, Scene, StandardMaterial, Mesh, Vector3, Matrix, MeshBuilder } from '@babylonjs/core';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { OpenDoorCommand } from '../action_strategies/OpenDoorCommand';
import { WorldItem } from '../item_types/WorldItem';
import { Point, Segment, GeometryUtils, Shape, Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
const colors = GameConstants.colors;

export class DoorFactory {
    private scene: Scene;
    private meshBuilder: typeof MeshBuilder;

    constructor(scene: Scene, meshBuilder: typeof MeshBuilder) {
        this.scene = scene;
        this.meshBuilder = meshBuilder;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): WorldItem {

        boundingBox = boundingBox.mirrorY();

        const mesh = this.createMesh(boundingBox);
        const [side1, side2] = this.createSideItems(boundingBox);
        side1.parent = mesh;
        side2.parent = mesh;

        const door = new SimpleWorldItem(mesh, boundingBox, {type: 'door'});
        const center = boundingBox.getBoundingCenter();
        door.translate(new VectorModel(center.x, 2.5, center.y));
        this.setPivotMatrix(door);

        door.hasDefaultAction = true;
        door.setDefaultAction(new OpenDoorCommand(door, -Math.PI / 2));
        return door;
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial('door-material', this.scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }

    private createSideItems(boundingBox: Shape): [Mesh, Mesh] {
        const segment = <Segment> boundingBox;

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        const [parallelEdge1, parallelEdge2] = rectangle.getEdges().filter(edge => edge.getSlope() === segment.getSlope());

        const center = segment.getBoundingCenter();

        const dimension1 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge1, segment);
        const dimension2 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge2, segment);

        const side1 = this.createSideItem(dimension1, `${name}-side-1`);
        const side2 = this.createSideItem(dimension2, `${name}-side-2`);

        const translate1 = dimension1.getBoundingCenter().subtract(center);
        const translate2 = dimension2.getBoundingCenter().subtract(center);

        side1.translate(new Vector3(translate1.x, 0, translate1.y), 1);
        side2.translate(new Vector3(translate2.x, 0, translate2.y), 1);

        return [side1, side2];
    }

    private createSideItem(dimension: Shape, name: string): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            name,
            { width: dimension.xExtent(), depth: dimension.yExtent(), height: 8 },
            this.scene
        );

        mesh.material = this.createMaterial();
        mesh.receiveShadows = true;

        return mesh;
    }

    private createMesh(boundingBox: Shape): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            `door-container`,
            { width: boundingBox.xExtent(), depth: boundingBox.yExtent(), height: 8 },
            this.scene
        );

        mesh.isVisible = false;
        return mesh;
    }

    private setPivotMatrix(door: WorldItem) {
        const pivotPoint = new VectorModel(4, 0, 0);
        door.mesh.setPivotMatrix(Matrix.Translation(pivotPoint.x, pivotPoint.y, pivotPoint.z));
    }
}
