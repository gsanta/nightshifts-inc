import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';
import { World } from '../../../../model/World';

export class GwmDoorImporter implements GwmItemImporter {
    private doorTemplate: Door;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        doorTemplate: Door,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.doorTemplate = doorTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }


    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const door = this.doorTemplate.clone();

        door.mesh.translate(toVector3(translate), 1);

        this.setPivotMatrix(worldItem, door);

        this.shadowGenerator.getShadowMap().renderList.push(door.mesh);

        return door;
    }

    private setPivotMatrix(worldItem: GwmWorldItem<AdditionalData>, door: Door) {
        const angle = worldItem.additionalData.angle;
        if (this.isHorizontal(door)) {
            const xExtent = door.getXExtent();
            if (worldItem.additionalData.axis.x === worldItem.dimensions.left + worldItem.dimensions.width) {
                door.setPivot(new VectorModel(xExtent, 0, 0), angle);
            } else if (worldItem.additionalData.axis.x === worldItem.dimensions.left) {
                door.setPivot(new VectorModel(-xExtent, 0, 0), angle);
            } else {
                throw new Error('Invalid pivot position for when creating GameObject: ' + worldItem);
            }
        }
    }

    private isHorizontal(meshModel: WorldItem) {
        return meshModel.getXExtent() > meshModel.getZExtent();
    }
}
