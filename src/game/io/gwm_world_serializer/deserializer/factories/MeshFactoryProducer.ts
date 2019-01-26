import { MeshFactory } from './MeshFactory';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { WallFactory } from './WallFactory';
import { DoorFactory } from './DoorFactory';
import { PlayerFactory } from './PlayerFactory';
import { FloorFactory } from './FloorFactory';
import { WindowFactory } from './WindowFactory';
import { StaticItemFactory } from './StaticItemFactory';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { GameObjectToWorldCenterTranslatorDecorator } from '../../GameObjectToWorldCenterTranslatorDecorator';
import { GameObjectToRealWorldCoordinateWrapper } from '../../GameObjectToRealWorldCoordinateWrapper';
import { ItemDeserializer } from '../../../json_world_serializer/factories/ItemDeserializer';
import { DefaultDeserializer } from '../../../json_world_serializer/factories/DefaultDeserializer';
import { TemplateCreator } from '../../../../model/core/templates/TemplateCreator';
import { WallTemplateCreator } from '../../../../model/core/templates/creators/WallTemplateCreator';
import { DoorTemplateCreator } from '../../../../model/core/templates/creators/DoorTemplateCreator';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../../../../model/core/templates/creators/ModelFileBasedTemplateCreator';
import { VectorModel } from '../../../../model/core/VectorModel';
import { FloorTemplateCreator } from '../../../../model/core/templates/creators/FloorTemplateCreator';
import { WindowTemplateCreator } from '../../../../model/core/templates/creators/WindowTemplateCreator';
import { AsyncTemplateCreator } from '../../../../model/core/templates/AsyncTemplateCreator';
import { GameObject } from 'game-worldmap-generator';
import { AbstractMeshFactoryProducer } from '../../../../model/core/factories/AbstractMeshFactoryProducer';
import { AbstractMeshFactory } from '../../../../model/core/factories/AbstractMeshFactory';
import { Promise } from 'es6-promise';

export class MeshFactoryProducer extends AbstractMeshFactoryProducer<GameObject> {

    public getFactory(
        scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<AbstractMeshFactory<GameObject>> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
            worldDimensions, 1, new GameObjectToRealWorldCoordinateWrapper(worldDimensions, 1)
        );

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new AbstractMeshFactory(
                    {
                        wall: new WallFactory(meshMap.wall.create(), gameObjectTranslator, shadowGenerator, 1),
                        door: new DoorFactory(meshMap.door.create(), gameObjectTranslator, shadowGenerator, 1),
                        player: new PlayerFactory(meshMap.player.create(), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new FloorFactory(meshMap.floor.create(), gameObjectTranslator, shadowGenerator),
                        window: new WindowFactory(meshMap.window.create(), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new StaticItemFactory(meshMap.cupboard.create(), gameObjectTranslator, shadowGenerator),
                        table: new StaticItemFactory(meshMap.table.create(), gameObjectTranslator, shadowGenerator),
                        bathtub: new StaticItemFactory(meshMap.bathtub.create(), gameObjectTranslator, shadowGenerator),
                        washbasin: new StaticItemFactory(meshMap.washbasin.create(), gameObjectTranslator, shadowGenerator),
                        bed: new StaticItemFactory(meshMap.bed.create(), gameObjectTranslator, shadowGenerator)
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
