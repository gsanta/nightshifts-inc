import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { SerializedMeshModel } from '../../../model/core/MeshModel';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { JsonDefaultDeserializer } from './factories/JsonDefaultDeserializer';
import { World } from '../../../model/World';
import { JsonPlayerDeserializer } from './factories/JsonPlayerDeserializer';


export class JsonMeshFactoryProducer extends AbstractMeshFactoryProducer<SerializedMeshModel> {

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<SerializedMeshModel>> {

        return this.getTemplateProducers(scene)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new JsonDefaultDeserializer(meshMap.wall.create(world), shadowGenerator),
                        door: new JsonDefaultDeserializer(meshMap.door.create(world), shadowGenerator),
                        player: new JsonPlayerDeserializer(scene, meshMap.player.create(world), shadowGenerator, spotLight),
                        floor: new JsonDefaultDeserializer(meshMap.floor.create(world), shadowGenerator),
                        window: new JsonDefaultDeserializer(meshMap.window.create(world), shadowGenerator),
                        cupboard: new JsonDefaultDeserializer(meshMap.cupboard.create(world), shadowGenerator),
                        table: new JsonDefaultDeserializer(meshMap.table.create(world), shadowGenerator),
                        bathtub: new JsonDefaultDeserializer(meshMap.bathtub.create(world), shadowGenerator),
                        washbasin: new JsonDefaultDeserializer(meshMap.washbasin.create(world), shadowGenerator),
                        bed: new JsonDefaultDeserializer(meshMap.bed.create(world), shadowGenerator)
                }
                );
            });
    }
}
