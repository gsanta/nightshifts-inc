import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh, Scene } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';
import { GameConstants } from '../../../../GameConstants';
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
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const wallPiece1 = this.wallTemplate.clone();
        const wallPiece2 = this.wallTemplate.clone();

        wallPiece1.translate(translate);
        wallPiece2.translate(translate);

        wallPiece1.mesh.scaling.x = scaling.x();
        wallPiece1.mesh.scaling.y = scaling.y();
        wallPiece1.mesh.scaling.z = scaling.z();

        wallPiece2.mesh.scaling.x = scaling.x();
        wallPiece2.mesh.scaling.y = scaling.y();
        wallPiece2.mesh.scaling.z = scaling.z();

        const material = new BABYLON.StandardMaterial('wallMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);
        material.emissiveColor = BABYLON.Color3.FromHexString('#111111');
        wallPiece2.mesh.material = material;

        if (this.isVerticalWallPiece(wallPiece1.mesh)) {
            this.verticalWallPieceDimensionsAdjustment(wallPiece1.mesh, this.gameObjectToMeshSizeRatio);
            this.verticalWallPieceDimensionsAdjustment(wallPiece2.mesh, this.gameObjectToMeshSizeRatio);
            wallPiece1.mesh.scaling.x /= 2;
            wallPiece1.translate(new VectorModel(-wallPiece1.mesh.scaling.x, 0, 0));
            wallPiece2.mesh.scaling.x /= 2;
            wallPiece2.translate(new VectorModel(wallPiece1.mesh.scaling.x, 0, 0));

        } else {
            wallPiece1.mesh.scaling.z /= 2;
            wallPiece1.translate(new VectorModel(0, 0, -wallPiece1.mesh.scaling.z));
            wallPiece2.mesh.scaling.z /= 2;
            wallPiece2.translate(new VectorModel(0, 0, wallPiece1.mesh.scaling.z));
        }

        this.shadowGenerator.getShadowMap().renderList.push(wallPiece1.mesh);
        return wallPiece1;
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}
