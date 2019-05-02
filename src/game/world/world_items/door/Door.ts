import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3, Matrix } from '@babylonjs/core';
import { ContainerWorldItem } from '../ContainerWorldItem';
import { Border } from '../Border';
import { VectorModel } from '../../../model/core/VectorModel';
import { WorldItem, SerializedMeshModel } from '../WorldItem';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { DividerWorldItemFactory } from '../world_item_factories/DividerWorldItemFactory';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;


export class Door extends ContainerWorldItem implements Border {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;
    public sides: [WorldItem, WorldItem];

    public name: 'door';

    constructor(container: WorldItem, side1: WorldItem, side2: WorldItem) {
        super([]);

        this.hasDefaultAction = true;
        this.mesh = container.mesh;

        this.container = container;

        this.addChild(side1);
        this.addChild(side2);
        side1.parent = this;
        side2.parent = this;
        this.sides = [side1, side2];
    }

    public setPivot(axis: VectorModel, angle: number) {
        this.pivotAngle = angle;
        this.pivot = axis;
        this.mesh.setPivotMatrix(Matrix.Translation(axis.x, axis.y, axis.z));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            this.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.rotation.y = this.pivotAngle;
            this.isOpen = true;
        }
    }

    public serialize(): SerializedMeshModel {
        const baseInfo = super.serialize();

        baseInfo.additionalData = {
            angle: this.pivotAngle,
            axis: this.pivot.serialize(),
        };

        return baseInfo;
    }

    public getSide1BoundingPolygon() {
        return this.children[0].getBoundingPolygon();
    }

    public getSide2BoundingPolygon() {
        return this.children[1].getBoundingPolygon();
    }

    public getSide1Meshes(): Mesh[] {
        return [this.children[0].mesh];
    }

    public getSide2Meshes(): Mesh[] {
        return [this.children[1].mesh];
    }

    public setMaterial(material: StandardMaterial) {
        this.children.forEach(child => child.mesh.material = material);
    }

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Door {
        const dividerWorldItemFactory = new DividerWorldItemFactory(scene, MeshBuilder, world.dimensions, this.createMaterial(scene));

        return <Door> dividerWorldItemFactory.create(gwmWorldItem);
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('doorMaterial', scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }
}
