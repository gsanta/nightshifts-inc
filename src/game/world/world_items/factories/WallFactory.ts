import { Color3, MeshBuilder, Scene, StandardMaterial, Vector3, Mesh, Color4, Texture } from '@babylonjs/core';
import { Point, Polygon, Line, GeometryUtils } from '@nightshifts.inc/geometry';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { GameObject } from '../item_types/GameObject';
import { Segment } from '@nightshifts.inc/geometry/build/shapes/Segment';
import { Border } from '../item_types/Border';
const colors = GameConstants.colors;

export class WallFactory implements GwmItemImporter {
    private scene: Scene;
    private index = 1;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: WorldItemInfo, world: World): GameObject {
        const wall = this.fromGwmWorldItem(worldItem, this.scene, world);

        return wall;
    }

    public fromGwmWorldItem(gwmWorldItem: WorldItemInfo, scene: Scene, world: World): GameObject {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.translate(new Point(translateX, translateY));

        const segment = <Segment> gwmWorldItem.dimensions.negate('y');

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        // const [parallelEdge1, parallelEdge2] = rectangle.getEdges().filter(edge => edge.getLine().hasEqualSlope(segment.getLine()));

        // const wallSide1Dim = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge1, segment);
        // const wallSide2Dim = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge2, segment);

        const parentMesh = MeshBuilder.CreateBox(
                `default-wall-container-${this.index}`,
                {
                    width: rectangle.getBoundingInfo().extent[0],
                    depth: rectangle.getBoundingInfo().extent[1],
                    height: 7.2
                },
                scene
            );

        // const mesh1 = MeshBuilder
        //     .CreateBox(
        //         `wall-template-left-${this.index}`,
        //         {
        //             width: wallSide1Dim.getBoundingInfo().extent[0],
        //             depth: wallSide1Dim.getBoundingInfo().extent[1],
        //             height: 7.2
        //         },
        //         scene
        //     );

        const mat = new StandardMaterial('wallMaterial', scene);
        mat.diffuseTexture = new Texture('./assets/textures/brick.jpeg', this.scene);
        parentMesh.material = mat;

        // mesh1.parent = parentMesh;
        // mesh1.receiveShadows = true;
        // mesh1.translate(new Vector3(wallSide1Dim.getBoundingCenter().x, 0, wallSide1Dim.getBoundingCenter().y), 1);
        // const mesh2 = MeshBuilder
        //     .CreateBox(
        //         `wall-template-left-${this.index}`,
        //         {
        //             width: wallSide2Dim.getBoundingInfo().extent[0],
        //             depth: wallSide2Dim.getBoundingInfo().extent[1],
        //             height: 7.2,
        //             faceColors: this.getFaceColors()
        //         },
        //         scene
        //     );

        // mesh2.parent = parentMesh;
        // mesh2.receiveShadows = true;
        // // mesh2.material = material;
        // parentMesh.material = this.createMaterial2(scene);
        parentMesh.translate(new Vector3(rectangle.getBoundingCenter().x, 0, rectangle.getBoundingCenter().y), 1);
        // parentMesh.isVisible = false;

        this.index++;


        const wall = new Border(parentMesh, gwmWorldItem.dimensions, {type: 'wall'});
        parentMesh.translate(new Vector3(0, 3.6, 0), 1);

        parentMesh.computeWorldMatrix(true);
        // mesh1.computeWorldMatrix(true);
        // mesh2.computeWorldMatrix(true);
        return wall;
    }

    private getFaceColors(): Color4[] {
        const faceColors = new Array(6);


        faceColors[0] = new Color4(0.75, 0.75, 0.75, 1);
        faceColors[1] = new Color4(0.75, 0.75, 0.75, 1);
        faceColors[2] = new Color4(0.75, 0.75, 0.75, 1);
        faceColors[3] = new Color4(0.75, 0.75, 0.75, 1);
        faceColors[4] = new Color4(0.537, 0.32, 0.22, 1);

        return faceColors;
    }

    private createMaterial2(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('wallMaterial', scene);
        material.diffuseColor = Color3.FromHexString('#FF0000');
        // material.emissiveColor = Color3.FromHexString('#FF0000');

        return material;
    }
}
