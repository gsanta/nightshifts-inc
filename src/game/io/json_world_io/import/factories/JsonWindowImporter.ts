
import { ShadowGenerator } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/creature/type/Window';

export class JsonWindowImporter implements JsonItemImporter {
    private windowTemplate: Window;
    private shadowGenerator: ShadowGenerator;

    constructor(
        windowTemplate: Window,
        shadowGenerator: ShadowGenerator,
    ) {
        this.windowTemplate = windowTemplate;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): WorldItem {
        const window = this.windowTemplate.clone();

        window.meshes[0].wrappedMesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);

        this.shadowGenerator.getShadowMap().renderList.push(...window.meshes.map(mesh => mesh.wrappedMesh));

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), serializedMeshModel.additionalData.angle);

        return window;
    }
}
