import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { SerializedMeshModel } from '../../../model/core/MeshModel';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { JsonDefaultDeserializer } from './factories/JsonDefaultDeserializer';


export class JsonMeshFactoryProducer extends AbstractMeshFactoryProducer<SerializedMeshModel> {

    public getFactory(
        scene: Scene,
        worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<SerializedMeshModel>> {

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new JsonDefaultDeserializer(meshMap.wall.create(), shadowGenerator),
                        door: new JsonDefaultDeserializer(meshMap.door.create(), shadowGenerator),
                        player: new JsonDefaultDeserializer(meshMap.player.create(), shadowGenerator),
                        floor: new JsonDefaultDeserializer(meshMap.floor.create(), shadowGenerator),
                        window: new JsonDefaultDeserializer(meshMap.window.create(), shadowGenerator),
                        cupboard: new JsonDefaultDeserializer(meshMap.cupboard.create(), shadowGenerator),
                        table: new JsonDefaultDeserializer(meshMap.table.create(), shadowGenerator),
                        bathtub: new JsonDefaultDeserializer(meshMap.bathtub.create(), shadowGenerator),
                        washbasin: new JsonDefaultDeserializer(meshMap.washbasin.create(), shadowGenerator),
                        bed: new JsonDefaultDeserializer(meshMap.bed.create(), shadowGenerator)
                    }
                );
            });
    }
}
