import { GwmItemImporter } from './GwmItemImporter';
import { WorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';

export class GwmWallImporter implements GwmItemImporter {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public createItem(worldItem: WorldItem, world: World): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const mesh = this.meshModelTemplate.createMeshes()[0];
        const meshModel = new MeshModel(mesh, worldItem.name);

        meshModel.translate(translate);
        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();

        if (this.isVerticalWallPiece(mesh)) {
            this.verticalWallPieceDimensionsAdjustment(mesh, this.gameObjectToMeshSizeRatio);
        }

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}
