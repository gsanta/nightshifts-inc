
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';

export class JsonDoorImporter implements JsonItemImporter {
    private meshModelTemplate: MeshTemplate;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshTemplate,
        shadowGenerator: ShadowGenerator,
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): MeshModel {
        const mesh = this.meshModelTemplate.createMeshes()[0];

        mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        const door = new Door(mesh, 'door');

        door.setPivot(VectorModel.deserialize(serializedMeshModel.additionalData.axis), serializedMeshModel.additionalData.angle);

        return door;
    }
}
