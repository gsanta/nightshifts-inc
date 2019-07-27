import { Color3, Scene, StandardMaterial, Mesh, Vector3, Matrix, MeshBuilder, Skeleton } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { GameObject } from '../item_types/GameObject';
import { Segment, GeometryUtils, Shape, Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
import { calculateBoundingShpere, Sphere } from '../Sphere';
import { OpenWindowCommand } from '../action_strategies/OpenWindowCommand';
import { Border } from '../item_types/Border';
const colors = GameConstants.colors;

export class WindowFactory {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;
    private meshBuilder: typeof MeshBuilder;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene, meshBuilder: typeof MeshBuilder) {
        this.meshInfo = meshInfo;
        this.scene = scene;
        this.meshBuilder = meshBuilder;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): GameObject {
        boundingBox = boundingBox.negate('y');

        const boundingSphere = calculateBoundingShpere(meshes[1]);
        const side1 = this.createSideItems(boundingBox);

        meshes.forEach(m => {
            m.isVisible = true;
            m.parent = side1;
        });

        const window = new Border(meshes[0], boundingBox, {type: 'window'});
        window.animatedMeshes = meshes.filter(m => m.animations.length > 0);
        const center = boundingBox.getBoundingCenter();
        side1.translate(new Vector3(center.x, boundingSphere.height / 2, center.y), 1);

        return window;
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial('window-material', this.scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }

    private createSideItems(boundingBox: Shape): Mesh {
        const segment = <Segment> boundingBox;

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        const center = segment.getBoundingCenter();

        const side1 = this.createSideItem(rectangle, `${name}-side-1`);

        const translate1 = rectangle.getBoundingCenter().subtract(center);

        side1.translate(new Vector3(translate1.x, 0, translate1.y), 1);
        side1.material.wireframe = true;
        return side1;
    }

    private createSideItem(dimension: Shape, name: string): Mesh {
        const mesh = this.meshBuilder.CreateBox(
            name,
            { width: dimension.getBoundingInfo().extent[0], depth: dimension.getBoundingInfo().extent[1], height: 8 },
            this.scene
        );

        mesh.material = this.createMaterial();
        mesh.receiveShadows = true;

        return mesh;
    }

    private setPivotMatrix(door: GameObject) {
        const pivotPoint = new VectorModel(4, 0, 0);
        door.mesh.setPivotMatrix(Matrix.Translation(pivotPoint.x, pivotPoint.y, pivotPoint.z));
    }
}
