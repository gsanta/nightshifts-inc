
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';

export class JsonDoorImporter implements JsonItemImporter {
    private doorTemplate: Door;
    private shadowGenerator: ShadowGenerator;

    constructor(
        doorTemplate: Door,
        shadowGenerator: ShadowGenerator,
    ) {
        this.doorTemplate = doorTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): WorldItem {
        const door = <Door> this.doorTemplate.clone();

        door.containerMesh.wrappedMesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);

        this.shadowGenerator.getShadowMap().renderList.push(door.containerMesh.wrappedMesh);

        door.setPivot(VectorModel.deserialize(serializedMeshModel.additionalData.axis), serializedMeshModel.additionalData.angle);

        return door;
    }
}
