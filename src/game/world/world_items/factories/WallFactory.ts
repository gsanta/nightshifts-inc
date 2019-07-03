import { Color3, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Point, Polygon, Line, GeometryUtils } from '@nightshifts.inc/geometry';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { WorldItem } from '../item_types/WorldItem';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { Segment } from '@nightshifts.inc/geometry/build/shapes/Segment';
const colors = GameConstants.colors;

export class WallFactory implements GwmItemImporter {
    private scene: Scene;
    private index = 1;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: WorldItemInfo, world: World): WorldItem {
        const wall = this.fromGwmWorldItem(worldItem, this.scene, world);

        return wall;
    }

    public fromGwmWorldItem(gwmWorldItem: WorldItemInfo, scene: Scene, world: World): WorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const material = this.createMaterial(scene);

        let [wallSide1Dim, wallSide2Dim]: [Polygon, Polygon] = [null, null];

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.translate(new Point(translateX, translateY));

        // gwmWorldItem.dimensions = gwmWorldItem.dimensions.stretchY(-0.75);
        const segment = <Segment> gwmWorldItem.dimensions.mirrorY();

        const rectangle = GeometryUtils.addThicknessToSegment(segment, 0.25);

        const [parallelEdge1, parallelEdge2] = rectangle.getEdges().filter(edge => edge.getLine().hasEqualSlope(segment.getLine()));

        wallSide1Dim = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge1, segment);
        wallSide2Dim = GeometryUtils.createRectangleFromTwoOppositeSides(parallelEdge2, segment);

        const parentMesh = MeshBuilder.CreateBox(
                `default-wall-container-${this.index}`,
                {
                    width: gwmWorldItem.dimensions.xExtent(),
                    depth: gwmWorldItem.dimensions.yExtent(),
                    height: 7.2
                },
                scene
            );

        const mesh1 = MeshBuilder
            .CreateBox(`wall-template-left-${this.index}`, { width: wallSide1Dim.xExtent(), depth: wallSide1Dim.yExtent(), height: 7.2 }, scene);

        mesh1.parent = parentMesh;
        mesh1.receiveShadows = true;
        mesh1.material = material;
        mesh1.translate(new Vector3(wallSide1Dim.getBoundingCenter().x, 0, wallSide1Dim.getBoundingCenter().y), 1);
        const mesh2 = MeshBuilder
            .CreateBox(`wall-template-left-${this.index}`, {  width: wallSide2Dim.xExtent(), depth: wallSide2Dim.yExtent(), height: 7.2  }, scene);

        mesh2.parent = parentMesh;
        mesh2.receiveShadows = true;
        mesh2.material = material;
        mesh2.translate(new Vector3(wallSide2Dim.getBoundingCenter().x, 0, wallSide2Dim.getBoundingCenter().y), 1);
        parentMesh.material = this.createMaterial2(scene);
        parentMesh.isVisible = false;

        this.index++;


        const wall = new SimpleWorldItem(parentMesh, gwmWorldItem.dimensions, {type: 'wall'});
        wall.translate(new VectorModel(0, 3.6, 0));

        parentMesh.computeWorldMatrix(true);
        mesh1.computeWorldMatrix(true);
        mesh2.computeWorldMatrix(true);
        return wall;
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('wallMaterial', scene);
        material.diffuseColor = Color3.FromHexString('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        material.emissiveColor = Color3.FromHexString('#111111');

        return material;
    }

    private createMaterial2(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('wallMaterial', scene);
        material.diffuseColor = Color3.FromHexString(colors.wall);
        material.emissiveColor = Color3.FromHexString('#FF0000');

        return material;
    }
}
