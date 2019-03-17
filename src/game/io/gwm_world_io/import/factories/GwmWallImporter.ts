import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh, Scene } from 'babylonjs';
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

        const wallPiece1 = this.wallTemplate.clone();
        const wallPiece2 = this.wallTemplate.clone();

        wallPiece1.mesh.translate(translate);
        wallPiece2.mesh.translate(translate);

        wallPiece1.mesh.setScale(new VectorModel(scaling.x, scaling.y, scaling.z));
        wallPiece2.mesh.setScale(new VectorModel(scaling.x, scaling.y, scaling.z));

        if (this.isVerticalWallPiece(wallPiece1.mesh.wrappedMesh)) {
            this.verticalWallPieceDimensionsAdjustment(wallPiece1.mesh.wrappedMesh, this.gameObjectToMeshSizeRatio);
            this.verticalWallPieceDimensionsAdjustment(wallPiece2.mesh.wrappedMesh, this.gameObjectToMeshSizeRatio);

            wallPiece1.mesh.setScale(new VectorModel(wallPiece1.mesh.getScale().x / 2, undefined, undefined));
            wallPiece1.mesh.translate(new VectorModel(-wallPiece1.mesh.getScale().x, 0, 0));

            wallPiece2.mesh.setScale(new VectorModel(wallPiece2.mesh.getScale().x / 2, undefined, undefined));
            wallPiece2.mesh.translate(new VectorModel(wallPiece2.mesh.getScale().x, 0, 0));

        } else {
            wallPiece1.mesh.setScale(new VectorModel(undefined, undefined, wallPiece1.mesh.getScale().z / 2));
            wallPiece1.mesh.translate(new VectorModel(0, 0, -wallPiece1.mesh.getScale().z));

            wallPiece2.mesh.setScale(new VectorModel(undefined, undefined, wallPiece2.mesh.getScale().z / 2));
            wallPiece2.mesh.translate(new VectorModel(0, 0, wallPiece1.mesh.getScale().z));
        }

        this.shadowGenerator.getShadowMap().renderList.push(wallPiece1.mesh.wrappedMesh);

        const container = new ContainerWorldItem([wallPiece1, wallPiece2]);
        container.addChild(wallPiece1);
        container.addChild(wallPiece2);

        return container;
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}
