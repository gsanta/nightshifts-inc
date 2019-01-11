


import { ItemFactory } from './ItemFactory';
import { GameObject, Rectangle } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { StandardMaterial, ShadowGenerator } from 'babylonjs';
import { MeshModelTemplate } from '../io/MeshModelTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel } from '../VectorModel';
import { AdditionalData } from '../../../game_map_creator/AdditionalData';
import { Door } from '../../creature/type/Door';

export class DoorFactory implements ItemFactory {
    private meshModelTemplate: MeshModelTemplate;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        meshModelTemplate: MeshModelTemplate,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }


    public createItem(gameObject: GameObject<AdditionalData>): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const mesh = this.meshModelTemplate.cloneMeshes()[0];
        
        let meshModel: MeshModel;

        if (gameObject.additionalData.axis) {
            const pivotVector = this.getPivotVector(gameObject.dimensions, gameObject.additionalData.axis);
            const pivotAngle = gameObject.additionalData.angle;
            meshModel = new Door(mesh, pivotVector, pivotAngle);
        } else {
            meshModel = new MeshModel(mesh);
        }
        
        meshModel.translate(translate);

        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }

    private getPivotVector(rect: Rectangle, pivotAxis: {x: number, y: number}) {
        const isDoorHorizontal = () => rect.width > rect.height;

        if (isDoorHorizontal()) {
            if (pivotAxis.x === rect.left) {
                return new VectorModel(rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
            } else if (pivotAxis.x === rect.left + rect.width) {
                return new VectorModel(- rect.width / 2, 0, 0).scale(this.gameObjectToMeshSizeRatio);
            }
        } else {
            if (pivotAxis.y === rect.top) {
                return new VectorModel(0, 0, - rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
            } else if (pivotAxis.y === rect.top + rect.height) {
                return new VectorModel(0, 0, rect.height / 2).scale(this.gameObjectToMeshSizeRatio);
            }
        }
    }
}