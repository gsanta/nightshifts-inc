
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';

export class JsonStaticItemImporter implements JsonItemImporter {
    private meshModelTemplate: MeshModel;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshModel,
        shadowGenerator: ShadowGenerator,
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): MeshModel {
        const meshModel = this.meshModelTemplate.clone();

        meshModel.mesh.rotation.y = serializedMeshModel.additionalData.rotation;

        meshModel.mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1, BABYLON.Space.WORLD);
            // mesh.scaling.x = serializedMeshModel.scaling.x;
            // mesh.scaling.y = serializedMeshModel.scaling.y;
            // mesh.scaling.z = serializedMeshModel.scaling.z;
        this.shadowGenerator.getShadowMap().renderList.push(meshModel.mesh);


        return meshModel;
    }
}
