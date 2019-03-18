import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from '../../game/world_items/WorldItem';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../game/model/core/VectorModel';


export class DefaultWall extends ContainerWorldItem {

    constructor(worldItem: WorldItem) {
        super([]);

        const wallSide1 = worldItem;
        const wallSide2 = wallSide1.clone();

        this.addChild(wallSide1);
        this.addChild(wallSide2);

        this.transformWallSides();
    }

    private transformWallSides(): void {

        // if (this.isVerticalWallPiece(this.children[0].mesh.wrappedMesh)) {
        //     this.scale(new VectorModel(this.getScale().x / 2, undefined, undefined));

        //     this.children[0].translate(new VectorModel(-this.getScale().x, 0, 0));
        //     this.children[1].translate(new VectorModel(this.getScale().x, 0, 0));
        // } else {
            this.scale(new VectorModel(undefined, undefined, this.getScale().z / 2));

            this.children[0].translate(new VectorModel(0, 0, -this.getScale().z));
            this.children[1].translate(new VectorModel(0, 0, this.getScale().z));
        // }
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }
}
