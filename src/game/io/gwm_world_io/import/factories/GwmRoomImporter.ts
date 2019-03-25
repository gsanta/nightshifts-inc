import { GwmWorldItem } from 'game-worldmap-generator';
import { StandardMaterial, Scene, Vector3, Vector2 } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { WorldItem } from '../../../../world_items/WorldItem';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { World } from '../../../../model/World';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { ContainerWorldItem } from '../../../../../engine/world_items/ContainerWorldItem';
import { BabylonMeshWrapper } from '../../../../../engine/wrappers/babylon/BabylonMeshWrapper';
import { Room } from '../../../../../engine/world_items/Room';
const colors = GameConstants.colors;

export class GwmRoomImporter {
    private scene: Scene;
    private material: StandardMaterial;
    private worldItemTranslator: WorldItemTranslator;

    constructor(
        scene: Scene,
        worldItemTranslator: WorldItemTranslator
    ) {
        this.scene = scene;
        this.material = this.createMaterial();
        this.worldItemTranslator = worldItemTranslator;
    }

    public createItem(worldItem: GwmWorldItem, world: World): ContainerWorldItem {
        return Room.fromGwmWorldItem(worldItem, this.scene, world);
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }
}
