
import { Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { Polygon, Rectangle, Point } from '@nightshifts.inc/geometry';
import { Color3 } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { ContainerWorldItem } from './ContainerWorldItem';
import { Border } from './Border';
import { WorldItem } from './WorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
const colors = GameConstants.colors;

export class Wall extends ContainerWorldItem implements Border {
    private rotation: VectorModel = new VectorModel(0, 0, 0);
    private static index = 0;
    public sides: [WorldItem, WorldItem];

    private constructor(mesh: Mesh, boundingBox: Polygon) {
        super([]);

        this.mesh = mesh;
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Wall {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const material = this.createMaterial(scene);

        let [wallSide1Dim, wallSide2Dim]: [Polygon, Polygon] = [null, null];

        gwmWorldItem.dimensions = gwmWorldItem.dimensions
        .translate(new Point(translateX, translateY));

        if (gwmWorldItem.dimensions.width > gwmWorldItem.dimensions.height) {
            gwmWorldItem.dimensions = gwmWorldItem.dimensions.stretchY(-0.75);
            [wallSide1Dim, wallSide2Dim] = (<Rectangle> gwmWorldItem.dimensions).cutToEqualHorizontalSlices(1, true);
        } else {
            gwmWorldItem.dimensions = gwmWorldItem.dimensions.stretchX(-0.25);
            [wallSide1Dim, wallSide2Dim] = (<Rectangle> gwmWorldItem.dimensions).cutToEqualVerticalSlices(1, true);
        }

        const parentMesh = MeshBuilder.CreateBox(
                `default-wall-container-${this.index}`, {  width: gwmWorldItem.dimensions.width, depth: gwmWorldItem.dimensions.height, height: 8  }, scene);

        const mesh1 = MeshBuilder.CreateBox(`wall-template-left-${this.index}`, { width: wallSide1Dim.width, depth: wallSide1Dim.height, height: 8 }, scene);

        mesh1.parent = parentMesh;
        mesh1.receiveShadows = true;
        mesh1.material = material;
        mesh1.translate(new Vector3(wallSide1Dim.left, 0, wallSide1Dim.top), 1);

        const mesh2 = MeshBuilder.CreateBox(`wall-template-left-${this.index}`, {  width: wallSide2Dim.width, depth: wallSide2Dim.height, height: 8  }, scene);

        mesh2.parent = parentMesh;
        mesh2.receiveShadows = true;
        mesh2.material = material;
        mesh2.translate(new Vector3(wallSide2Dim.left, 0, wallSide2Dim.top), 1);

        parentMesh.material = this.createMaterial2(scene);
        parentMesh.isVisible = false;

        this.index++;


        const wall = new Wall(parentMesh, gwmWorldItem.dimensions);
        wall.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingCenter().x, 2.5, -gwmWorldItem.dimensions.getBoundingCenter().y));

        parentMesh.computeWorldMatrix(true);
        mesh1.computeWorldMatrix(true);
        mesh2.computeWorldMatrix(true);
        return wall;
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('wallMaterial', scene);
        material.diffuseColor = Color3.FromHexString(colors.wall);
        material.emissiveColor = Color3.FromHexString('#111111');

        return material;
    }

    private static createMaterial2(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('wallMaterial', scene);
        material.diffuseColor = Color3.FromHexString(colors.wall);
        material.emissiveColor = Color3.FromHexString('#FF0000');

        return material;
    }

    public getAbsoluteBoundingPolygon(): Polygon {
        return this.getBoundingBox();
    }

    public getRotation(): VectorModel {
        return this.rotation;
    }

    public clone(): ContainerWorldItem {
        throw new Error('not implemented');
    }
}
