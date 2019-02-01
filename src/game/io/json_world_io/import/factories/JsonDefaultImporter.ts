
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';

export class JsonDefaultImporter implements JsonItemImporter {
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
        const meshModel = new MeshModel(mesh, serializedMeshModel.name);

        meshModel.translate(VectorModel.deserialize(serializedMeshModel.translate));
        mesh.scaling.x = serializedMeshModel.scaling.x;
        mesh.scaling.y = serializedMeshModel.scaling.y;
        mesh.scaling.z = serializedMeshModel.scaling.z;

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }
}
