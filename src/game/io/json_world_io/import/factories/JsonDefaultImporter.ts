
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';

export class JsonDefaultImporter implements JsonItemImporter {
    private worldItemTemplate: WorldItem;
    private shadowGenerator: ShadowGenerator;

    constructor(
        worldItemTemplate: WorldItem,
        shadowGenerator: ShadowGenerator,
    ) {
        this.worldItemTemplate = worldItemTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): WorldItem {
        const worldItem = this.worldItemTemplate.clone()[0];

        worldItem.translate(VectorModel.deserialize(serializedMeshModel.translate));
        worldItem.mesh.scaling.x = serializedMeshModel.scaling.x;
        worldItem.mesh.scaling.y = serializedMeshModel.scaling.y;
        worldItem.mesh.scaling.z = serializedMeshModel.scaling.z;

        this.shadowGenerator.getShadowMap().renderList.push(worldItem.mesh);

        return worldItem;
    }
}
