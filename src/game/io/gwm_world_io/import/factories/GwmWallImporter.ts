import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh, Scene, Vector3 } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';
import { GameConstants } from '../../../../GameConstants';
import { ContainerWorldItem } from '../../../../../engine/world_items/ContainerWorldItem';
const colors = GameConstants.colors;

export class GwmWallImporter implements GwmItemImporter {
    private wallTemplate: WorldItem;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;
    private scene: Scene;

    constructor(
        wallTemplate: WorldItem,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number,
        scene: Scene
    ) {
        this.wallTemplate = wallTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y / 2, -translate2.y());

        const wall = <ContainerWorldItem> this.wallTemplate.clone();

        if (this.isVerticalWallPiece(scaling)) {
            wall.translate(translate);
            wall.rotateAtCenter(VectorModel.yUint(), Math.PI / 2);

            wall.scale(new VectorModel(scaling.z, scaling.y, scaling.x));
            this.verticalWallPieceDimensionsAdjustment(wall, this.gameObjectToMeshSizeRatio);
            // this.verticalWallPieceDimensionsAdjustment(wall.children[1].mesh.wrappedMesh, this.gameObjectToMeshSizeRatio);
        } else {
            wall.translate(translate);
            wall.scale(new VectorModel(scaling.x, scaling.y, scaling.z));
        }

        this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh.wrappedMesh);

        return wall;
    }

    private isVerticalWallPiece(vector: VectorModel) {
        return vector.z > vector.x;
    }


    private verticalWallPieceDimensionsAdjustment(wall: WorldItem, gameObjectToMeshSizeRatio: number) {
        const currentScale = wall.getScale();
        wall.scale(new VectorModel(currentScale.x - gameObjectToMeshSizeRatio, currentScale.y, currentScale.z));
        // wall.scaling.x = wall.scaling.x - gameObjectToMeshSizeRatio;
    }
}
