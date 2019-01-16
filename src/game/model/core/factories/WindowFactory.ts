


import { ItemFactory } from './ItemFactory';
import { GameObject} from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel, toVector3 } from '../VectorModel';
import { AdditionalData } from '../../../game_map_creator/AdditionalData';
import { Window } from '../../creature/type/Window';

export class WindowFactory implements ItemFactory {
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

        const meshes = this.meshModelTemplate.createMeshes();
        
        meshes[0].translate(toVector3(translate), 1);
        
        // const door = new Door(mesh);

        // this.setPivotMatrix(gameObject, door);

        this.shadowGenerator.getShadowMap().renderList.push(...meshes);

        const window = new Window(meshes, null, null, 1);

        const windowGlass1 = meshes[3];
        const windowGlass2 = meshes[4];
        window.setPivots(new VectorModel(-2, 0, 0), new VectorModel(2, 0, 0), 90);

        return window;
    }

    private setPivotMatrix(gameObject: GameObject<AdditionalData>, window: Window) {
        const angle = gameObject.additionalData.angle;
        if (this.isHorizontal(window)) {
            const xExtent = window.getXExtent();
            if (gameObject.additionalData.axis.x === gameObject.dimensions.left + gameObject.dimensions.width) {
                // window.setPivot(new VectorModel(xExtent, 0, 0), angle);
            } else if (gameObject.additionalData.axis.x === gameObject.dimensions.left) {
                // window.setPivot(new VectorModel(-xExtent, 0, 0), angle);
            } else {
                throw new Error('Invalid pivot position for when creating GameObject: ' + gameObject);
            }
        }
    }

    private isHorizontal(meshModel: MeshModel) {
        return meshModel.getXExtent() > meshModel.getZExtent();
    }
}