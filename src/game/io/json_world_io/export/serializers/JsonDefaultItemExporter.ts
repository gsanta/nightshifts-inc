import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';

export class JsonDefaultItemExporter {
    public serialize(meshModel: WorldItem): SerializedMeshModel {
        return {
            name: meshModel.name,
            scaling: {
                x: meshModel.getScale().x(),
                y: meshModel.getScale().y(),
                z: meshModel.getScale().z(),
            },
            translate: {
                x: meshModel.getPosition().x(),
                y: meshModel.getPosition().y(),
                z: meshModel.getPosition().z()
            }
        };
    }
}
