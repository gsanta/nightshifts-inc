import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { MeshBuilder, StandardMaterial, ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel } from '../VectorModel';

export class WallFactory implements ItemFactory {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }

    public createItem(gameObject: GameObject): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const mesh = this.meshModelTemplate.createMeshes()[0];
        const meshModel = new MeshModel(mesh);
    
        meshModel.translate(translate);
        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();

        if (this.isVerticalWallPiece(mesh)) {
            this.verticalWallPieceDimensionsAdjustment(mesh, this.gameObjectToMeshSizeRatio);
        }

        this.shadowGenerator.getShadowMap().renderList.push(mesh)

        return meshModel;
    }

    private isVerticalWallPiece(mesh: Mesh) {
        return mesh.scaling.z > mesh.scaling.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}