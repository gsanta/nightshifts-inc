import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { Point, Polygon } from '@nightshifts.inc/geometry';
import { Mesh } from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import {StandardMaterial} from '@babylonjs/core';
import { Color3 } from '@babylonjs/core';
import { MeshBuilder } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { WorldItem, SerializedMeshModel } from './WorldItem';
import { World } from '../../World';
import { VectorModel } from '../../../model/core/VectorModel';
import { SimpleWorldItem } from './SimpleWorldItem';
import { MeshTemplateConfig } from '../../../model/core/templates/MeshTemplate';
const colors = GameConstants.colors;

export class WindowGlass extends SimpleWorldItem {

    public constructor(mesh: Mesh, children: [WorldItem, WorldItem]) {
        super(mesh, null, {children});
        this.mesh = mesh;
    }

    public setPivotMatrix(matrix: any) {
        this.getChildren()[0].mesh.setPivotMatrix(matrix);
        this.getChildren()[1].mesh.setPivotMatrix(matrix);
    }

    public static fromGwmWorldItem(gwmWorldItem: WorldItemInfo, scene: Scene, world: World): WindowGlass {
        const containerMesh = this.createContainerMesh(gwmWorldItem, scene);
        const side1 = this.createMesh(gwmWorldItem, scene);
        const side2 = this.createMesh(gwmWorldItem, scene);
        side1.mesh.parent = containerMesh;
        side2.mesh.parent = containerMesh;
        side1.translate(new VectorModel(0, 0, gwmWorldItem.dimensions.getBoundingRectangle().height / 16));
        side2.translate(new VectorModel(0, 0, -gwmWorldItem.dimensions.getBoundingRectangle().height / 16));

        return new WindowGlass(containerMesh, [side1, side2]);
    }

    private static createMesh(gwmWorldItem: WorldItemInfo, scene: Scene): SimpleWorldItem {
        const dimensions = gwmWorldItem.dimensions;
        const middle1 = MeshBuilder.CreateBox(
            'window-middle-left',
            { width: dimensions.getBoundingRectangle().width / 2, depth: dimensions.getBoundingRectangle().height / 8, height: 4 * 8 / 6 },
            scene
        );

        middle1.material = this.createMaterial(scene);
        middle1.receiveShadows = true;

        return new SimpleWorldItem(middle1, gwmWorldItem.dimensions);
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const windowGlass = new StandardMaterial('window-glass-material', scene);
        windowGlass.diffuseColor = Color3.FromHexString(colors.window);

        return windowGlass;
    }

    private static createContainerMesh(gwmWorldItem: WorldItemInfo, scene: Scene) {
        const dimensions = gwmWorldItem.dimensions;

        const mesh = MeshBuilder.CreateBox(
            'window-glass-left-container',
            { width: dimensions.getBoundingRectangle().width / 2, depth: dimensions.getBoundingRectangle().height / 4, height: 4 * 8 / 6 },
            scene
        );

        mesh.isVisible = false;

        return mesh;
    }
}

class WindowFrame extends SimpleWorldItem {
    public constructor(containerMesh: Mesh, children: WorldItem[]) {
        super(containerMesh, null, {children});
        this.mesh = containerMesh;    }

    public static fromGwmWorldItem(gwmWorldItem: WorldItemInfo, scene: Scene, world: World): WindowFrame {
        const containerMesh = this.createContainerMesh(gwmWorldItem, scene);
        const side1 = this.createMesh(gwmWorldItem, scene);
        const side2 = this.createMesh(gwmWorldItem, scene);
        side1.mesh.parent = containerMesh;
        side2.mesh.parent = containerMesh;
        side1.translate(new VectorModel(0, 0, gwmWorldItem.dimensions.getBoundingRectangle().height / 16));
        side2.translate(new VectorModel(0, 0, -gwmWorldItem.dimensions.getBoundingRectangle().height / 16));

        return new WindowGlass(containerMesh, [side1, side2]);    }

    private static createMesh(gwmWorldItem: WorldItemInfo, scene: Scene): SimpleWorldItem {
        const dimensions = gwmWorldItem.dimensions;

        const mesh = MeshBuilder.CreateBox(
            'window-bottom',
            { width: dimensions.getBoundingRectangle().width, depth: dimensions.getBoundingRectangle().height / 8, height: 8 / 6 },
            scene
        );

        mesh.material = this.createMaterial(scene);
        mesh.receiveShadows = true;

        return new SimpleWorldItem(mesh, gwmWorldItem.dimensions);
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const windowFrame = new StandardMaterial('window-frame-material', scene);
        windowFrame.diffuseColor = Color3.FromHexString(colors.wall);
        windowFrame.emissiveColor = Color3.FromHexString('#111111');

        return windowFrame;
    }

    private static createContainerMesh(gwmWorldItem: WorldItemInfo, scene: Scene) {
        const dimensions = gwmWorldItem.dimensions;

        const mesh = MeshBuilder.CreateBox(
            'window-glass-left-container',
            { width: dimensions.getBoundingRectangle().width, depth: dimensions.getBoundingRectangle().height / 4, height: 8 / 6 },
            scene
        );

        mesh.isVisible = false;

        return mesh;
    }
}

export class Window extends SimpleWorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    private isHorizontal = true;
    public sides: [WorldItem, WorldItem];

    private pivot1: VectorModel;
    private pivot2: VectorModel;

    constructor(containerMesh: Mesh, children: WorldItem[], config?: MeshTemplateConfig) {
        super(containerMesh, null, {type: 'window', children});
        this.mesh = containerMesh;

        children.forEach(child => child.setParent(this));
        this.hasDefaultAction = false;

        this.sides = [
            new SimpleWorldItem(
                null,
                null,
                {
                    children: [
                        this.getChildren()[0].getChildren()[0],
                        this.getChildren()[1].getChildren()[0],
                        this.getChildren()[2].getChildren()[0],
                        this.getChildren()[3].getChildren()[0]
                    ]
                }
            ),
            new SimpleWorldItem(
                null,
                null,
                {
                    children: [
                        this.getChildren()[0].getChildren()[1],
                        this.getChildren()[1].getChildren()[1],
                        this.getChildren()[2].getChildren()[1],
                        this.getChildren()[3].getChildren()[1]
                    ]
                }
            )
        ];
    }

    public setPivots(pivot1: VectorModel, pivot2: VectorModel, pivotAngle: number) {
        this.pivotAngle = pivotAngle;
        this.pivot1 = pivot1;
        this.pivot2 = pivot2;

        // (<WindowGlass> this.getChildren()[2]).setPivotMatrix(Matrix.Translation(pivot1.x, pivot1.y, pivot1.z));
        // (<WindowGlass> this.getChildren()[3]).setPivotMatrix(Matrix.Translation(pivot2.x, pivot2.y, pivot2.z));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            if (this.isHorizontal) {
                this.getChildren()[2].getChildren()[0].mesh.rotation.y = 0;
                this.getChildren()[3].getChildren()[0].mesh.rotation.y = 0;
            } else {
                this.getChildren()[2].getChildren()[0].mesh.rotation.y = 0;
                this.getChildren()[3].getChildren()[0].mesh.rotation.y = 0;
            }
            this.isOpen = false;
        } else {
            this.getChildren()[2].getChildren()[0].mesh.rotation.y = this.pivotAngle;
            this.getChildren()[3].getChildren()[0].mesh.rotation.y = - this.pivotAngle;
            this.isOpen = true;
        }
    }

    public getPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public intersectsPoint(vector: VectorModel) {
        return this.intersectsPoint(new VectorModel(vector.x, vector.y, vector.z));
    }

    public serialize(): SerializedMeshModel {
        const baseInfo = super.serialize();

        baseInfo.additionalData = {
            angle: this.pivotAngle,
            axis1: this.pivot1.serialize(),
            axis2: this.pivot2.serialize()
        };

        return baseInfo;
    }

    public clone(): Window {
        return null;
    }

    public static fromGwmWorldItem(gwmWorldItem: WorldItemInfo, scene: Scene, world: World): Window {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        gwmWorldItem.dimensions = gwmWorldItem.dimensions
            .translate(new Point(translateX, translateY));


        const topFrame = WindowFrame.fromGwmWorldItem(gwmWorldItem, scene, world);
        const bottomFrame = WindowFrame.fromGwmWorldItem(gwmWorldItem, scene, world);
        const leftGlass = WindowGlass.fromGwmWorldItem(gwmWorldItem, scene, world);
        const rightGlass = WindowGlass.fromGwmWorldItem(gwmWorldItem, scene, world);

        const height = 8;

        bottomFrame.translate(new VectorModel(0, - height / 2 + height / 12, 0));
        topFrame.translate(new VectorModel(0, height / 2 - height / 12, 0));
        leftGlass.translate(new VectorModel(- gwmWorldItem.dimensions.getBoundingRectangle().width / 4, 0, 0));
        rightGlass.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingRectangle().width / 4, 0, 0));

        const containerMesh = this.createContainerMesh(scene);

        gwmWorldItem.dimensions = gwmWorldItem.dimensions.mirrorY();

        const window = new Window(containerMesh, [ topFrame, bottomFrame, leftGlass, rightGlass ]);
        window.translate(new VectorModel(0, 2.5, 0));
        window.setBoudingBox(<Polygon> gwmWorldItem.dimensions);
        // window.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingCenter().x, 2.5, -gwmWorldItem.dimensions.getBoundingCenter().y));

        return window;
    }

    private static createContainerMesh(scene: Scene): Mesh {
        const width = 8;
        const depth = 1;
        const height = 8;

        const containerMesh = MeshBuilder.CreateBox(
            'window-container',
            { width, depth, height: height / 4 },
            scene
        );

        containerMesh.isVisible = false;

        return containerMesh;
    }
}
