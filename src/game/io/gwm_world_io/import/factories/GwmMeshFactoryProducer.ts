import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { GwmWallDeserializer } from './GwmWallDeserializer';
import { GwmDoorDeserializer } from './GwmDoorDeserializer';
import { GwmPlayerDeserializer } from './GwmPlayerDeserializer';
import { GwmFloorDeserializer } from './GwmFloorDeserializer';
import { GwmWindowDeserializer } from './GwmWindowDeserializer';
import { GwmStaticItemDeserializer } from './GwmStaticItemDeserializer';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { GameObjectToWorldCenterTranslatorDecorator } from '../game_object_mappers/GameObjectToWorldCenterTranslatorDecorator';
import { GameObjectToRealWorldCoordinateMapper } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { GameObject } from 'game-worldmap-generator';
import { AbstractMeshFactoryProducer } from '../../../../model/core/factories/AbstractMeshFactoryProducer';
import { MeshFactory } from '../../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { World } from '../../../../model/World';

export class GwmMeshFactoryProducer extends AbstractMeshFactoryProducer<GameObject> {

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<GameObject>> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(1, new GameObjectToRealWorldCoordinateMapper(1));

        return this.getTemplateProducers(scene)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new GwmWallDeserializer(meshMap.wall.create(world), gameObjectTranslator, shadowGenerator, 1),
                        door: new GwmDoorDeserializer(meshMap.door.create(world), gameObjectTranslator, shadowGenerator, 1),
                        player: new GwmPlayerDeserializer(meshMap.player.create(world), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new GwmFloorDeserializer(meshMap.floor.create(world), gameObjectTranslator, shadowGenerator),
                        window: new GwmWindowDeserializer(meshMap.window.create(world), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new GwmStaticItemDeserializer(meshMap.cupboard.create(world), gameObjectTranslator, shadowGenerator),
                        table: new GwmStaticItemDeserializer(meshMap.table.create(world), gameObjectTranslator, shadowGenerator),
                        bathtub: new GwmStaticItemDeserializer(meshMap.bathtub.create(world), gameObjectTranslator, shadowGenerator),
                        washbasin: new GwmStaticItemDeserializer(meshMap.washbasin.create(world), gameObjectTranslator, shadowGenerator),
                        bed: new GwmStaticItemDeserializer(meshMap.bed.create(world), gameObjectTranslator, shadowGenerator)
                    }
                );
            });
    }
}
