import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';

export class JsonDefaultItemExporter {
    public serialize(meshModel: WorldItem): SerializedMeshModel {
        return {
            name: meshModel.name,
            scaling: {
                x: meshModel.mesh.getScale().x,
                y: meshModel.mesh.getScale().y,
                z: meshModel.mesh.getScale().z,
            },
            translate: {
                x: meshModel.mesh.getPosition().x,
                y: meshModel.mesh.getPosition().y,
                z: meshModel.mesh.getPosition().z
            }
        };
    }
}
