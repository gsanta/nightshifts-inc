import { Color3, MeshBuilder, Scene, StandardMaterial } from '@babylonjs/core';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { AdditionalData } from '../../world_import/AdditionalData';
import { OpenDoorCommand } from '../action_strategies/OpenDoorCommand';
import { WorldItem } from '../item_types/WorldItem';
import { DividerWorldItemFactory } from './DividerWorldItemFactory';
const colors = GameConstants.colors;

export class DoorFactory implements GwmItemImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: WorldItemInfo<AdditionalData>, world: World): WorldItem {
        const dividerWorldItemFactory = new DividerWorldItemFactory(this.scene, MeshBuilder, world.dimensions, this.createMaterial());

        const door = dividerWorldItemFactory.create(worldItem);
        door.hasDefaultAction = true;
        door.setDefaultAction(new OpenDoorCommand(door, -Math.PI / 2));
        return door;
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial('door-material', this.scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }
}
