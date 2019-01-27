import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { GenericItemDeserializer } from '../../../../model/core/factories/MeshFactory';

export interface JsonItemDeserializer extends GenericItemDeserializer<SerializedMeshModel> {
    createItem(serializedMeshModel: SerializedMeshModel): MeshModel;
}
