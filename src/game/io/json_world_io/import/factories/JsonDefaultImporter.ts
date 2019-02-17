
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';

export class JsonDefaultImporter implements JsonItemImporter {
    private meshTemplate: MeshModel;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshTemplate: MeshModel,
        shadowGenerator: ShadowGenerator,
    ) {
        this.meshTemplate = meshTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): MeshModel {
        const meshModel = this.meshTemplate.clone();

        meshModel.translate(VectorModel.deserialize(serializedMeshModel.translate));
        meshModel.mesh.scaling.x = serializedMeshModel.scaling.x;
        meshModel.mesh.scaling.y = serializedMeshModel.scaling.y;
        meshModel.mesh.scaling.z = serializedMeshModel.scaling.z;

        this.shadowGenerator.getShadowMap().renderList.push(meshModel.mesh);

        return meshModel;
    }
}
