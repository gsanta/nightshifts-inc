
import { ShadowGenerator } from 'babylonjs';
import { JsonItemDeserializer } from './JsonItemDeserializer';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/creature/type/Window';

export class JsonWindowImporter implements JsonItemDeserializer {
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
        // const mesh = this.meshModelTemplate.createMeshes()[0];
        const meshes = this.meshModelTemplate.createMeshes();

        meshes[0].translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);
        // mesh.scaling.x = serializedMeshModel.scaling.x;
        // mesh.scaling.y = serializedMeshModel.scaling.y;
        // mesh.scaling.z = serializedMeshModel.scaling.z;

        this.shadowGenerator.getShadowMap().renderList.push(...meshes);

        const window = new Window(meshes);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), serializedMeshModel.additionalData.angle);

        return window;
    }
}
