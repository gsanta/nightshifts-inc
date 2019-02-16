import { GwmItemImporter } from './GwmItemImporter';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';

export class GwmWallImporter implements GwmItemImporter {
    private meshModel: MeshModel;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        meshModel: MeshModel,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.meshModel = meshModel;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public createItem(gameObject: GameObject, world: World): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const wall = this.meshModel.clone();

        wall.translate(translate);
        wall.mesh.scaling.x = scaling.x();
        wall.mesh.scaling.y = scaling.y();
        wall.mesh.scaling.z = scaling.z();

        if (this.isVerticalWallPiece(wall.mesh)) {
            this.verticalWallPieceDimensionsAdjustment(wall.mesh, this.gameObjectToMeshSizeRatio);
        }

        this.shadowGenerator.getShadowMap().renderList.push(wall.mesh);

        return wall;
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}
