import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { Mesh, MeshBuilder, Scene } from 'babylonjs';
import { VectorModel } from '../../game/model/core/VectorModel';
import { MeshTemplateConfig } from '../../game/model/core/templates/MeshTemplate';
import { BabylonMeshWrapper } from '../wrappers/babylon/BabylonMeshWrapper';
import { SimpleWorldItem } from './SimpleWorldItem';


export class DefaultWall extends ContainerWorldItem {
    private parentMesh: WorldItem;
    private rotation: VectorModel = new VectorModel(0, 0, 0);

    private constructor(parent: WorldItem, wallSide1: WorldItem, wallSide2: WorldItem) {
        super([]);

        this.parentMesh = parent;
        this.parentMesh.mesh.wrappedMesh.visibility = 0;

        this.addChild(wallSide1);
        this.addChild(wallSide2);

        this.transformWallSides();
    }

    public translate(vectorModel: VectorModel): void {
        this.parentMesh.translate(vectorModel);
    }

    public scale(vectorModel: VectorModel) {
        this.parentMesh.scale(vectorModel);
        // this.children[0].scale(new VectorModel(vectorModel.x, 1, 1));
        // this.children[0].scale(new VectorModel(vectorModel.x, 1, 1));
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

    private transformWallSides(): void {

        // if (this.isVerticalWallPiece(this.children[0].mesh.wrappedMesh)) {
        //     this.scale(new VectorModel(this.getScale().x / 2, undefined, undefined));

        //     this.children[0].translate(new VectorModel(-this.getScale().x, 0, 0));
        //     this.children[1].translate(new VectorModel(this.getScale().x, 0, 0));
        // } else {
            this.children[0].scale(new VectorModel(undefined, undefined, this.getScale().z / 2));
            this.children[1].scale(new VectorModel(undefined, undefined, this.getScale().z / 2));

            this.children[0].translate(new VectorModel(0, 0, -this.getScale().z));
            this.children[1].translate(new VectorModel(0, 0, this.getScale().z));
        // }
    }

    public static createFromTemplate(config: MeshTemplateConfig, scene: Scene): DefaultWall {
        const mesh = new BabylonMeshWrapper(
            MeshBuilder.CreateBox('wall-template', { width: 1, depth: 1, height: 1 }, scene)
        );

        const wallSide1 = new SimpleWorldItem(mesh, 'wall', { ...config });
        const wallSide2 = wallSide1.clone();
        const parentMesh = new BabylonMeshWrapper(
            MeshBuilder.CreateBox('default-wall-container', { width: 1, depth: 1, height: 1 }, scene)
        );
        const parent = new SimpleWorldItem(parentMesh, 'default-wall-container');
        wallSide1.mesh.wrappedMesh.parent = parent.mesh.wrappedMesh;
        wallSide2.mesh.wrappedMesh.parent = parent.mesh.wrappedMesh;

        wallSide1.mesh.wrappedMesh.visibility = 0;
        wallSide2.mesh.wrappedMesh.visibility = 0;

        return new DefaultWall(parent, wallSide1, wallSide2);
    }
}
