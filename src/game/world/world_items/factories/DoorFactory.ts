import { Color3, Scene, StandardMaterial, Mesh, Vector3, Matrix, MeshBuilder, Skeleton } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { GameObject } from '../item_types/GameObject';
import { Segment, GeometryUtils, Shape, Polygon } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { Border } from '../item_types/Border';
const colors = GameConstants.colors;

export class DoorFactory {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;
    private meshBuilder: typeof MeshBuilder;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene, meshBuilder: typeof MeshBuilder) {
        this.meshInfo = meshInfo;
        this.scene = scene;
        this.meshBuilder = meshBuilder;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): GameObject {
        // meshes[0].setAbsolutePosition(
        //     new Vector3(meshes[0].getAbsolutePosition().x, meshes[0].getBoundingInfo().boundingBox.extendSize.y, meshes[0].getAbsolutePosition().z));

        boundingBox = boundingBox.negate('y');
        const [side1] = this.createSideItems(boundingBox);

        const mesh = meshes[1];
        meshes.forEach(m => {
            m.isVisible = true;
            m.parent = side1;
        });

        // side1.parent = mesh;
        // side2.parent = mesh;

        const door = new Border(mesh, boundingBox, {type: 'door'});
        const center = boundingBox.getBoundingCenter();
        side1.translate(new Vector3(center.x, 4, center.y), 1);
        // door.translate(new VectorModel(center.x, 4, center.y));
        // this.setPivotMatrix(door);

        door.animatedMeshes = meshes.filter(m => m.animations.length > 0);

        return door;
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial('door-material', this.scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }

    private createSideItems(boundingBox: Shape): [Mesh] {
        const segment = <Segment> boundingBox;

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        const [parallelEdge1, parallelEdge2] = rectangle.getEdges().filter(edge => edge.getSlope() === segment.getSlope());

        const center = segment.getBoundingCenter();

        const dimension1 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge1, segment);
        const dimension2 = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge2, segment);

        const side1 = this.createSideItem(dimension1, `container`);
        // const side2 = this.createSideItem(dimension2, `${name}-side-2`);

        const translate1 = dimension1.getBoundingCenter().subtract(center);
        const translate2 = dimension2.getBoundingCenter().subtract(center);

        side1.translate(new Vector3(translate1.x, 0, translate1.y), 1);
        // side2.translate(new Vector3(translate2.x, 0, translate2.y), 1);

        return [side1];
    }

    private createSideItem(dimension: Shape, name: string): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            name,
            { width: dimension.getBoundingInfo().extent[0], depth: dimension.getBoundingInfo().extent[1], height: 8 },
            this.scene
        );

        mesh.material = this.createMaterial();
        mesh.material.wireframe = true;
        mesh.receiveShadows = true;

        return mesh;
    }

    private createMesh(boundingBox: Shape): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            `door-container`,
            { width: boundingBox.getBoundingInfo().extent[0], depth: boundingBox.getBoundingInfo().extent[1], height: 8 },
            this.scene
        );

        mesh.isVisible = false;
        return mesh;
    }

    private setPivotMatrix(door: GameObject) {
        const pivotPoint = new VectorModel(4, 0, 0);
        door.mesh.setPivotMatrix(Matrix.Translation(pivotPoint.x, pivotPoint.y, pivotPoint.z));
    }
}
