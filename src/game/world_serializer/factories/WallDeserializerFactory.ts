
import { ShadowGenerator } from 'babylonjs';
import { ItemDeserializerFactory } from './ItemDeserializerFactory';
import { MeshTemplate } from '../../model/core/templates/MeshTemplate';
import { SerializedMeshModel } from '../SerializedMeshModel';
import { MeshModel } from '../../model/core/MeshModel';
import { VectorModel } from '../../model/core/VectorModel';

export class WallDeserializerFactory implements ItemDeserializerFactory {
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
        mesh.scaling.x = serializedMeshModel.scaling;
        mesh.scaling.y = serializedMeshModel.scaling;
        mesh.scaling.z = serializedMeshModel.scaling;

        const meshModel = new MeshModel(mesh);

        meshModel.translate(VectorModel.deserialize(serializedMeshModel.translate));

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }
}
