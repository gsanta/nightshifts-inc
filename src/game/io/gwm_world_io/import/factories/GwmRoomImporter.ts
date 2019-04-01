import { Scene } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ContainerWorldItem } from '../../../../../engine/world_items/ContainerWorldItem';
import { Room } from '../../../../../engine/world_items/Room';
import { GameConstants } from '../../../../GameConstants';
import { World } from '../../../../model/World';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
const colors = GameConstants.colors;

export class GwmRoomImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): ContainerWorldItem {
        return Room.fromGwmWorldItem(worldItem, this.scene, world);
    }
}
