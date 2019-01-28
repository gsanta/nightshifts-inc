import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { GenericItemDeserializer } from '../../../../model/core/factories/MeshFactory';
import { World } from '../../../../model/World';

export interface JsonItemDeserializer extends GenericItemDeserializer<SerializedMeshModel> {
    createItem(serializedMeshModel: SerializedMeshModel, world: World): MeshModel;
}
