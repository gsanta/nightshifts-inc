import { GwmItemImporter } from './GwmItemImporter';
import { GameObject} from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';
import { World } from '../../../../model/World';

export class GwmDoorImporter implements GwmItemImporter {
    private doorTemplate: Door;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        doorTemplate: Door,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.doorTemplate = doorTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }


    public createItem(gameObject: GameObject<AdditionalData>, world: World): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const door = this.doorTemplate.clone();

        door.mesh.translate(toVector3(translate), 1);

        this.setPivotMatrix(gameObject, door);

        this.shadowGenerator.getShadowMap().renderList.push(door.mesh);

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
