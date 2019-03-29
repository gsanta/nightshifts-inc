import { WorldItem, SerializedMeshModel } from '../../../world_items/WorldItem';
import { Mesh, Scene, MeshBuilder, StandardMaterial } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { MeshTemplateConfig } from '../../core/templates/MeshTemplate';
import { MeshWrapper } from '../../../../engine/wrappers/MeshWrapper';
import { SimpleWorldItem } from '../../../../engine/world_items/SimpleWorldItem';
import { GwmWorldItem, Polygon } from 'game-worldmap-generator';
import { World } from '../../World';
import { BabylonMeshWrapper } from '../../../../engine/wrappers/babylon/BabylonMeshWrapper';
import { GameConstants } from '../../../GameConstants';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { AdditionalData } from '../../../io/gwm_world_io/import/AdditionalData';
import { ContainerWorldItem } from '../../../../engine/world_items/ContainerWorldItem';
const colors = GameConstants.colors;

export class Door extends ContainerWorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;
    public mesh: MeshWrapper<Mesh>;

    constructor(mesh: MeshWrapper<any>, side1: WorldItem, side2: WorldItem) {
        super([]);

        this.hasDefaultAction = true;
        this.mesh = mesh;

        this.addChild(side1);
        this.addChild(side2);
    }

    public setPivot(axis: VectorModel, angle: number) {
        this.pivotAngle = angle;
        this.pivot = axis;
        this.mesh.wrappedMesh.setPivotMatrix(BABYLON.Matrix.Translation(axis.x, axis.y, axis.z));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            this.mesh.wrappedMesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.wrappedMesh.rotation.y = this.pivotAngle;
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

    public static fromGwmWorldItem(gwmWorldItem: GwmWorldItem, scene: Scene, world: World): Door {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);


        gwmWorldItem.dimensions = gwmWorldItem.dimensions
            .translate(new Point(translateX, translateY));

        const side1 = this.createSide(gwmWorldItem.dimensions, scene);
        const side2 = this.createSide(gwmWorldItem.dimensions, scene);

        const material = this.createMaterial(scene);
        const mesh = this.createMesh(scene);
        mesh.wrappedMesh.isVisible = false;
        mesh.wrappedMesh.material = material;
        side1.mesh.wrappedMesh.parent = mesh.wrappedMesh;
        side1.translate(new VectorModel(0, 0, 1.25 / 8));
        side2.mesh.wrappedMesh.parent = mesh.wrappedMesh;
        side2.translate(new VectorModel(0, 0, -1.25 / 8));

        mesh.translate(new VectorModel(gwmWorldItem.dimensions.getBoundingCenter().x, 2.5, -gwmWorldItem.dimensions.getBoundingCenter().y));

        const door = new Door(mesh, side1, side2);
        this.setPivotMatrix(gwmWorldItem, door);
        return door;
    }

    private static createSide(dimensions: Polygon, scene: Scene): WorldItem {
        const mesh = new BabylonMeshWrapper(
            MeshBuilder.CreateBox(`wall-side-1`, { width: 8, depth: 0.25, height: 5 }, scene)
        );

        mesh.wrappedMesh.material = this.createMaterial(scene);

        return new SimpleWorldItem(mesh, 'door');
    }

    private static createMaterial(scene: Scene): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }

    private static createMesh(scene: Scene): MeshWrapper<any> {
        return new BabylonMeshWrapper(MeshBuilder.CreateBox('door-template', { width: 8, depth: 1, height: 5 }, scene));
    }

    private static setPivotMatrix(worldItem: GwmWorldItem<AdditionalData>, door: Door) {
        const angle = worldItem.additionalData.angle;
        const xExtent = door.mesh.wrappedMesh.getBoundingInfo().boundingBox.extendSize.x;
        door.setPivot(new VectorModel(xExtent, 0, 0), angle);
        // if (this.isHorizontal(door)) {
        //     if (worldItem.additionalData.axis.x === worldItem.dimensions.left + worldItem.dimensions.width) {
        //     } else if (worldItem.additionalData.axis.x === worldItem.dimensions.left) {
        //         door.setPivot(new VectorModel(-xExtent, 0, 0), angle);
        //     } else {
        //         throw new Error('Invalid pivot position for when creating GameObject: ' + worldItem);
        //     }
        // }
    }
}
