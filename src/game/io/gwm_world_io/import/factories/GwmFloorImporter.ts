import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';
import { Room } from '../../../../../engine/world_items/Room';

export class GwmFloorImporter implements GwmItemImporter {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const mesh = this.meshModelTemplate.createMeshes()[0];
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const meshModel = new Room(mesh, null, 'floor');
        meshModel.translate(translate);

        return meshModel;
    }
}
