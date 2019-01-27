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

export class GwmMeshFactoryProducer extends AbstractMeshFactoryProducer<GameObject> {

    public getFactory(
        scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<GameObject>> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
            worldDimensions, 1, new GameObjectToRealWorldCoordinateMapper(worldDimensions, 1)
        );

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new GwmWallDeserializer(meshMap.wall.create(), gameObjectTranslator, shadowGenerator, 1),
                        door: new GwmDoorDeserializer(meshMap.door.create(), gameObjectTranslator, shadowGenerator, 1),
                        player: new GwmPlayerDeserializer(meshMap.player.create(), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new GwmFloorDeserializer(meshMap.floor.create(), gameObjectTranslator, shadowGenerator),
                        window: new GwmWindowDeserializer(meshMap.window.create(), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new GwmStaticItemDeserializer(meshMap.cupboard.create(), gameObjectTranslator, shadowGenerator),
                        table: new GwmStaticItemDeserializer(meshMap.table.create(), gameObjectTranslator, shadowGenerator),
                        bathtub: new GwmStaticItemDeserializer(meshMap.bathtub.create(), gameObjectTranslator, shadowGenerator),
                        washbasin: new GwmStaticItemDeserializer(meshMap.washbasin.create(), gameObjectTranslator, shadowGenerator),
                        bed: new GwmStaticItemDeserializer(meshMap.bed.create(), gameObjectTranslator, shadowGenerator)
                    }
                );
            });
    }

    // public static getFactory2(scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<ItemDeserializer> {
    //     return this.getTemplateProducers(scene, worldDimensions)
    //         .then(meshMap => {
    //             return new DefaultDeserializer(meshMap.wall.create(), shadowGenerator);
    //         });
    // }
}
