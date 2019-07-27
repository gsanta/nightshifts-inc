import { Mesh, Scene, StandardMaterial, MeshBuilder, Skeleton } from '@babylonjs/core';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GameConstants } from '../../../GameConstants';
import { VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { GameObject } from '../item_types/GameObject';
import { WorldItemToRealWorldCoordinateMapper } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Color3 } from '@babylonjs/core';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';
const colors = GameConstants.colors;


export class FloorFactory implements GwmItemImporter {
    private scene: Scene;
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(scene: Scene) {
        this.scene = scene;
    }


    public createItem(worldItem: WorldItemInfo, world: World): GameObject {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper());

        const boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions);
        const translate = new VectorModel(boundingBox.getBoundingInfo().min[0], 0, -boundingBox.getBoundingInfo().max[1]);
        translate.addZ(-3);

        const meshModel = new GameObject(null, null, {type: 'floor'});

        return meshModel;
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('empty-area-material', scene);
        material.diffuseColor = Color3.FromHexString(colors.cold);
        return material;
    }

    private createMesh(worldItem: WorldItemInfo): Mesh {
        return MeshBuilder.CreateGround(
                'floor',
                { width: worldItem.dimensions.getBoundingInfo().extent[0], height: worldItem.dimensions.getBoundingInfo().extent[1], updatable: true },
                this.scene
            );
    }
}
