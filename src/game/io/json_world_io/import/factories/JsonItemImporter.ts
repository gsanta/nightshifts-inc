import { VisualWorldItem, SerializedMeshModel } from '../../../../world_items/VisualWorldItem';
import { GenericItemImporter } from '../../../../model/core/factories/MeshFactory';
import { World } from '../../../../model/World';

export interface JsonItemImporter extends GenericItemImporter<SerializedMeshModel> {
    createItem(serializedMeshModel: SerializedMeshModel, world: World): VisualWorldItem;
}
