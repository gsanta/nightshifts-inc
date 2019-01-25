import { SerializedMeshModel } from '../SerializedMeshModel';
import { MeshModel } from '../../model/core/MeshModel';

export interface ItemDeserializerFactory {
    createItem(serializedMeshModel: SerializedMeshModel): MeshModel;
}
