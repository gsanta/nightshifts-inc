import { MeshModel, SerializedMeshModel } from '../../../model/core/MeshModel';

export interface ItemDeserializer {
    createItem(serializedMeshModel: SerializedMeshModel): MeshModel;
}
