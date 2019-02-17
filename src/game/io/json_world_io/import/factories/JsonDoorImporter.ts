
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
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

    public createItem(serializedMeshModel: SerializedMeshModel): MeshModel {
        const door = this.doorTemplate.clone();

        door.mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);

        this.shadowGenerator.getShadowMap().renderList.push(door.mesh);

        door.setPivot(VectorModel.deserialize(serializedMeshModel.additionalData.axis), serializedMeshModel.additionalData.angle);

        return door;
    }
}
