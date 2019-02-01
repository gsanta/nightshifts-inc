import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { GenericItemImporter } from '../../../../model/core/factories/MeshFactory';
import { World } from '../../../../model/World';

export interface JsonItemImporter extends GenericItemImporter<SerializedMeshModel> {
    createItem(serializedMeshModel: SerializedMeshModel, world: World): MeshModel;
}
