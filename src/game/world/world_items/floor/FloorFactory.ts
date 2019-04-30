import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../model/core/templates/MeshTemplate';
import { WorldItemTranslator } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../WorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { Room } from '../room/Room';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;


export class FloorFactory implements GwmItemImporter {
    private gameObjectTranslator: WorldItemTranslator;
    private scene: Scene;

    constructor(scene: Scene, gameObjectTranslator: WorldItemTranslator) {
        this.gameObjectTranslator = gameObjectTranslator;
        this.scene = scene;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        // const mesh = this.createMesh(worldItem);

        // // mesh.material = this.createMaterial(this.scene);
        // // mesh.material.alpha = 1;

        // mesh.isVisible = false;

        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const meshModel = new Room(null, null, 'floor');
        meshModel.translate(translate);

        return meshModel;
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new BABYLON.StandardMaterial('empty-area-material', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.cold);
        return material;
    }

    private createMesh(worldItem: GwmWorldItem): Mesh {
        return BABYLON.MeshBuilder.CreateGround(
                'floor',
                { width: worldItem.dimensions.width, height: worldItem.dimensions.height, updatable: true },
                this.scene
            );
    }
}
