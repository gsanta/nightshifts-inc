import { ItemFactory } from './ItemFactory';
import { GameObject} from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../../GameObjectToRealWorldCoordinateWrapper';
import { AdditionalData } from '../../AdditionalData';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';

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

        const door = new Door(mesh);

        this.setPivotMatrix(gameObject, door);

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return door;
    }

    private setPivotMatrix(gameObject: GameObject<AdditionalData>, door: Door) {
        const angle = gameObject.additionalData.angle;
        if (this.isHorizontal(door)) {
            const xExtent = door.getXExtent();
            if (gameObject.additionalData.axis.x === gameObject.dimensions.left + gameObject.dimensions.width) {
                door.setPivot(new VectorModel(xExtent, 0, 0), angle);
            } else if (gameObject.additionalData.axis.x === gameObject.dimensions.left) {
                door.setPivot(new VectorModel(-xExtent, 0, 0), angle);
            } else {
                throw new Error('Invalid pivot position for when creating GameObject: ' + gameObject);
            }
        }
    }

    private isHorizontal(meshModel: MeshModel) {
        return meshModel.getXExtent() > meshModel.getZExtent();
    }
}
