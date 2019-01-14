


import { ItemFactory } from './ItemFactory';
import { GameObject, Rectangle } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { StandardMaterial, ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel, toVector3 } from '../VectorModel';
import { AdditionalData } from '../../../game_map_creator/AdditionalData';
import { Door } from '../../creature/type/Door';

export class DoorFactory implements ItemFactory {
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


    public createItem(gameObject: GameObject<AdditionalData>): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const mesh = this.meshModelTemplate.createMeshes()[0];
        
        
        mesh.translate(toVector3(translate), 1);
        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();
        
        let meshModel: MeshModel;
        if (gameObject.additionalData.axis) {
            const pivotVector = this.getPivotVector(gameObject.dimensions, scaling, gameObject.additionalData.axis);
            const pivotAngle = gameObject.additionalData.angle;

            // var pivot = new BABYLON.TransformNode("root");
            // const pivotTranslate = translate.clone();
            // pivotTranslate.addX(1);
            // pivot.position = toVector3(pivotTranslate);
            
            // mesh.parent = pivot;
            
            // pivot.rotate(BABYLON.Axis.Y, gameObject.additionalData.angle, BABYLON.Space.WORLD);
            // mesh.setPivotMatrix(BABYLON.Matrix.Translation(1, 0, 0));

            mesh.setPivotMatrix(BABYLON.Matrix.Translation(0.5, 0, 0), true);
            mesh.translate(toVector3(new VectorModel(-0.5, 0, 0)), 1);
            meshModel = new Door(mesh, pivotVector, pivotAngle);
        } else {
            meshModel = new MeshModel(mesh);
        }

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }

    private getPivotVector(rect: Rectangle, scaling: VectorModel,  pivotAxis: {x: number, y: number}) {
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