import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3, Matrix } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { WorldItem, SerializedMeshModel } from './WorldItem';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { DividerWorldItemFactory } from '../factories/DividerWorldItemFactory';
import { GameConstants } from '../../../GameConstants';
import { SimpleWorldItem } from './SimpleWorldItem';
const colors = GameConstants.colors;


export class Door extends SimpleWorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;
    public sides: [WorldItem, WorldItem];

    public type: 'door';

    constructor(container: WorldItem, side1: WorldItem, side2: WorldItem) {
        super(container.mesh, null, {type: 'door'});

        this.hasDefaultAction = true;
        this.mesh = container.mesh;

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

    public setMaterial(material: StandardMaterial) {
        this.getChildren().forEach(child => child.mesh.material = material);
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
