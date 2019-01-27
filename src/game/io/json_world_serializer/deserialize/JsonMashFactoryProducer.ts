import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { SerializedMeshModel } from '../../../model/core/MeshModel';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { DefaultDeserializer } from '../factories/DefaultDeserializer';


export class JsonMeshFactoryProducer extends AbstractMeshFactoryProducer<SerializedMeshModel> {

    public getFactory(
        scene: Scene,
        worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<SerializedMeshModel>> {

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new DefaultDeserializer(meshMap.wall.create(), shadowGenerator),
                        door: new DefaultDeserializer(meshMap.door.create(), shadowGenerator),
                        player: new DefaultDeserializer(meshMap.player.create(), shadowGenerator),
                        floor: new DefaultDeserializer(meshMap.floor.create(), shadowGenerator),
                        window: new DefaultDeserializer(meshMap.window.create(), shadowGenerator),
                        cupboard: new DefaultDeserializer(meshMap.cupboard.create(), shadowGenerator),
                        table: new DefaultDeserializer(meshMap.table.create(), shadowGenerator),
                        bathtub: new DefaultDeserializer(meshMap.bathtub.create(), shadowGenerator),
                        washbasin: new DefaultDeserializer(meshMap.washbasin.create(), shadowGenerator),
                        bed: new DefaultDeserializer(meshMap.bed.create(), shadowGenerator)
                    }
                );
            });
    }
}
