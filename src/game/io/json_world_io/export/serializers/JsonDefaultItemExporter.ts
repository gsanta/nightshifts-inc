import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';

export class JsonDefaultItemExporter {
    public serialize(meshModel: MeshModel): SerializedMeshModel {
        return {
            name: meshModel.name,
            scaling: meshModel.getScale(),
            translate: {
                x: meshModel.getPosition().x(),
                y: meshModel.getPosition().y(),
                z: meshModel.getPosition().z()
            }
        };
    }
}
