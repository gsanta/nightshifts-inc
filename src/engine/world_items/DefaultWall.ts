import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { Mesh, MeshBuilder, Scene, StandardMaterial } from 'babylonjs';
import { VectorModel } from '../../game/model/core/VectorModel';
import { MeshTemplateConfig } from '../../game/model/core/templates/MeshTemplate';
import { BabylonMeshWrapper } from '../wrappers/babylon/BabylonMeshWrapper';
import { SimpleWorldItem } from './SimpleWorldItem';
import { GwmWorldItem, Rectangle } from 'game-worldmap-generator';
import { GameConstants } from '../../game/GameConstants';
import { MeshWrapper } from '../wrappers/MeshWrapper';
import { World } from '../../game/model/World';
import { Point } from 'game-worldmap-generator/build/model/Point';
const colors = GameConstants.colors;

export class DefaultWall extends ContainerWorldItem {
    private parentMesh: WorldItem;
    private rotation: VectorModel = new VectorModel(0, 0, 0);
    private static index = 0;

    private constructor(parent: WorldItem, wallSide1: WorldItem, wallSide2: WorldItem) {
        super([]);

        this.parentMesh = parent;
        this.parentMesh.mesh.wrappedMesh.visibility = 0;

        this.addChild(wallSide1);
        this.addChild(wallSide2);

    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): DefaultWall {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const material = this.createMaterial(scene);

        if (gwmWorldItem.dimensions.width > gwmWorldItem.dimensions.height) {
            gwmWorldItem.dimensions =  <Rectangle> new Rectangle(gwmWorldItem.dimensions.left, gwmWorldItem.dimensions.top, gwmWorldItem.dimensions.width, 1)
                .translate(new Point(0, 0.5));
        }

        gwmWorldItem.dimensions = gwmWorldItem.dimensions
            .translate(new Point(translateX, translateY));

        const [wallSide1Dim, wallSide2Dim] = this.getWallSideDimensions(gwmWorldItem);

        const mesh1 = new BabylonMeshWrapper(
            MeshBuilder.CreateBox(`wall-template-left-${this.index}`, { width: wallSide1Dim.width, depth: wallSide1Dim.height, height: 5 }, scene)
        );

        const mesh2 = new BabylonMeshWrapper(
            MeshBuilder.CreateBox(`wall-template-left-${this.index}`, {  width: wallSide2Dim.width, depth: wallSide2Dim.height, height: 5  }, scene)
        );

        const wallSide1 = new SimpleWorldItem(mesh1, 'wall');
        wallSide1.mesh.wrappedMesh.material = material;
        const wallSide2 = new SimpleWorldItem(mesh2, 'wall');
        wallSide2.mesh.wrappedMesh.material = material;

        const parentMesh = new BabylonMeshWrapper(
            MeshBuilder.CreateBox(
                `default-wall-container-${this.index}`, {  width: gwmWorldItem.dimensions.width, depth: gwmWorldItem.dimensions.height, height: 5  }, scene)
        );
        const parent = new SimpleWorldItem(parentMesh, 'default-wall-container');
        wallSide1.mesh.wrappedMesh.parent = parent.mesh.wrappedMesh;
        wallSide2.mesh.wrappedMesh.parent = parent.mesh.wrappedMesh;

        this.transformWallSides(gwmWorldItem, wallSide1, wallSide2);
        this.index++;

        const wall = new DefaultWall(parent, wallSide1, wallSide2);
        wall.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingCenter().x, 2.5, -gwmWorldItem.dimensions.getBoundingCenter().y));
        wallSide1.translate(new VectorModel(wallSide1Dim.left, 0, wallSide1Dim.top));
        wallSide2.translate(new VectorModel(wallSide2Dim.left, 0, wallSide2Dim.top));
        // wall.translate()
        return wall;
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const material = new BABYLON.StandardMaterial('wallMaterial', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.wall);
        material.emissiveColor = BABYLON.Color3.FromHexString('#111111');

        return material;
    }

    public translate(vectorModel: VectorModel): void {
        this.parentMesh.translate(vectorModel);
    }


    public getSide1BoundingPolygon() {
        return this.children[0].getBoundingPolygon();
    }

    public getSide2BoundingPolygon() {
        return this.children[1].getBoundingPolygon();
    }

    public getSide1Meshes(): Mesh[] {
        return [this.children[0].mesh.wrappedMesh];
    }

    public getSide2Meshes(): Mesh[] {
        return [this.children[1].mesh.wrappedMesh];
    }

    public scale(vectorModel: VectorModel) {
        this.parentMesh.scale(vectorModel);
        // this.children[0].scale(new VectorModel(vectorModel.x, 1, 1));
        // this.children[0].scale(new VectorModel(vectorModel.x, 1, 1));
    }

    public getScale(): VectorModel {
        return this.parentMesh.getScale();
    }

    public rotateAtCenter(vectorModel: VectorModel, amount: number): void {
        this.parentMesh.rotateAtCenter(vectorModel, amount);
        this.rotation = vectorModel.scale(amount);
    }

    public getRotation(): VectorModel {
        return this.rotation;
    }

    public clone(): ContainerWorldItem {
        const clonedChildren = this.children.map(child => child.clone());
        const parentClone = this.parentMesh.clone();
        clonedChildren[0].mesh.wrappedMesh.parent = parentClone.mesh.wrappedMesh;
        clonedChildren[1].mesh.wrappedMesh.parent = parentClone.mesh.wrappedMesh;
        clonedChildren[0].mesh.wrappedMesh.visibility = true;
        clonedChildren[1].mesh.wrappedMesh.visibility = true;

        return new DefaultWall(parentClone, clonedChildren[0], clonedChildren[1]);
    }

    private static getWallSideDimensions(gwmWorldItem: GwmWorldItem): [Rectangle, Rectangle] {
        if (gwmWorldItem.dimensions.height > gwmWorldItem.dimensions.width) {
            return this.getVerticalWallSideDimensions(gwmWorldItem);
        } else {
            return this.getHorizontalWallSideDimensions(gwmWorldItem);
        }
    }

    private static getVerticalWallSideDimensions(gwmWorldItem: GwmWorldItem): [Rectangle, Rectangle] {
        const originalDimensions = gwmWorldItem.dimensions;
        const rect1 = new Rectangle(
            -originalDimensions.width / 8,
            0,
            originalDimensions.width / 4,
            originalDimensions.height
        );

        const rect2 = new Rectangle(
            originalDimensions.width / 8,
            0,
            originalDimensions.width / 4,
            originalDimensions.height
        );

        return [rect1, rect2];
    }

    private static getHorizontalWallSideDimensions(gwmWorldItem: GwmWorldItem): [Rectangle, Rectangle] {
        const originalDimensions = gwmWorldItem.dimensions;
        const rect1 = new Rectangle(
            0,
            - originalDimensions.height / 8,
            originalDimensions.width,
            originalDimensions.height / 4
        );

        const rect2 = new Rectangle(
            0,
            originalDimensions.height / 8,
            originalDimensions.width,
            originalDimensions.height / 4
        );

        return [rect1, rect2];
    }

    private static transformWallSides(gwmWorldItem: GwmWorldItem, wallSide1: SimpleWorldItem, wallSide2: SimpleWorldItem): void {

        if (gwmWorldItem.dimensions.height > gwmWorldItem.dimensions.width) {
            // wallSide1.scale(new VectorModel(wallSide1.getScale().x / 2, undefined, undefined));
            // wallSide2.scale(new VectorModel(wallSide2.getScale().x / 2, undefined, undefined));
            // wallSide1.translate(new VectorModel(-wallSide1.getScale().x, 0, 0));
            // wallSide2.translate(new VectorModel(wallSide2.getScale().x, 0, 0));
        } else {
            // wallSide1.scale(new VectorModel(undefined, undefined, wallSide1.getScale().z / 2));
            // wallSide2.scale(new VectorModel(undefined, undefined, wallSide2.getScale().z / 2));
            // wallSide1.translate(new VectorModel(0, 0, -wallSide1.getScale().z));
            // wallSide2.translate(new VectorModel(0, 0, wallSide2.getScale().z));
        }
    }
}
