import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { GwmWallImporter } from './GwmWallImporter';
import { GwmDoorImporter } from './GwmDoorImporter';
import { GwmPlayerImporter } from './GwmPlayerImporter';
import { GwmFloorImporter } from './GwmFloorImporter';
import { GwmWindowImporter } from './GwmWindowImporter';
import { GwmStaticItemImporter } from './GwmStaticItemImporter';
import { GameObjectToWorldCenterTranslatorDecorator } from '../game_object_mappers/GameObjectToWorldCenterTranslatorDecorator';
import { GameObjectToRealWorldCoordinateMapper } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { WorldItem } from 'game-worldmap-generator';
import { AbstractMeshFactoryProducer } from '../../../../model/core/factories/AbstractMeshFactoryProducer';
import { MeshFactory } from '../../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { World } from '../../../../model/World';

export class GwmMeshFactoryProducer extends AbstractMeshFactoryProducer<WorldItem> {

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<WorldItem>> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(1, new GameObjectToRealWorldCoordinateMapper(1));

        return this.getTemplateProducers(scene)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new GwmWallImporter(meshMap.wall.create(world), gameObjectTranslator, shadowGenerator, 1),
                        door: new GwmDoorImporter(meshMap.door.create(), gameObjectTranslator, shadowGenerator, 1),
                        player: new GwmPlayerImporter(meshMap.player.create(world), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new GwmFloorImporter(meshMap.floor.create(world), gameObjectTranslator, shadowGenerator),
                        window: new GwmWindowImporter(meshMap.window.create(), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new GwmStaticItemImporter(meshMap.cupboard.create(world), gameObjectTranslator, shadowGenerator),
                        table: new GwmStaticItemImporter(meshMap.table.create(world), gameObjectTranslator, shadowGenerator),
                        bathtub: new GwmStaticItemImporter(meshMap.bathtub.create(world), gameObjectTranslator, shadowGenerator),
                        washbasin: new GwmStaticItemImporter(meshMap.washbasin.create(world), gameObjectTranslator, shadowGenerator),
                        bed: new GwmStaticItemImporter(meshMap.bed.create(world), gameObjectTranslator, shadowGenerator)
                    }
                );
            });
    }
}
