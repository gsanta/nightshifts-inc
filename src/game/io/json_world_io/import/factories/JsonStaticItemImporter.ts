
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { SimpleWorldItem } from '../../../../../engine/world_items/SimpleWorldItem';
import { BabylonMeshWrapper } from '../../../../../engine/wrappers/babylon/BabylonMeshWrapper';

export class JsonStaticItemImporter implements JsonItemImporter {
    private meshModelTemplate: MeshTemplate;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshTemplate,
        shadowGenerator: ShadowGenerator,
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): WorldItem {
        const meshes = this.meshModelTemplate.createMeshes();
        const meshModel = new SimpleWorldItem(meshes[0], serializedMeshModel.name);

        meshes.forEach(mesh => {
            mesh.rotation.y = serializedMeshModel.additionalData.rotation;

            mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1, BABYLON.Space.WORLD);
            // mesh.scaling.x = serializedMeshModel.scaling.x;
            // mesh.scaling.y = serializedMeshModel.scaling.y;
            // mesh.scaling.z = serializedMeshModel.scaling.z;
            this.shadowGenerator.getShadowMap().renderList.push(mesh);
        });


        return meshModel;
    }
}
