import { Mesh, Scene, StandardMaterial, MeshBuilder } from 'babylonjs';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { Room } from '../room/Room';
import { WorldItem } from '../WorldItem';
import { WorldItemTranslator } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Color3 } from 'babylonjs';
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
        const material = new StandardMaterial('empty-area-material', scene);
        material.diffuseColor = Color3.FromHexString(colors.cold);
        return material;
    }

    private createMesh(worldItem: GwmWorldItem): Mesh {
        return MeshBuilder.CreateGround(
                'floor',
                { width: worldItem.dimensions.width, height: worldItem.dimensions.height, updatable: true },
                this.scene
            );
    }
}
