import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { SerializedMeshModel } from '../../../model/core/MeshModel';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { JsonDefaultImporter } from './factories/JsonDefaultImporter';
import { World } from '../../../model/World';
import { JsonPlayerImporter } from './factories/JsonPlayerImporter';
import { JsonWindowImporter } from './factories/JsonWindowImporter';
import { JsonDoorImporter } from './factories/JsonDoorImporter';
import { JsonStaticItemImporter } from './factories/JsonStaticItemImporter';

export class JsonMeshFactoryProducer extends AbstractMeshFactoryProducer<SerializedMeshModel> {

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<SerializedMeshModel>> {

        return this.getTemplateProducers(scene, spotLight)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new JsonDefaultImporter(meshMap.wall.create(world), shadowGenerator),
                        door: new JsonDoorImporter(meshMap.door.create(), shadowGenerator),
                        player: new JsonPlayerImporter(scene, meshMap.player.create(), shadowGenerator, spotLight),
                        floor: new JsonDefaultImporter(meshMap.floor.create(world), shadowGenerator),
                        window: new JsonWindowImporter(meshMap.window.create(), shadowGenerator),
                        cupboard: new JsonStaticItemImporter(meshMap.cupboard.create(world), shadowGenerator),
                        table: new JsonStaticItemImporter(meshMap.table.create(world), shadowGenerator),
                        bathtub: new JsonStaticItemImporter(meshMap.bathtub.create(world), shadowGenerator),
                        washbasin: new JsonStaticItemImporter(meshMap.washbasin.create(world), shadowGenerator),
                        bed: new JsonStaticItemImporter(meshMap.bed.create(world), shadowGenerator)
                }
                );
            });
    }
}
