import { World } from '../../../model/World';
import { JsonWorldSchema } from '../import/JsonWorldSchema';
import { SerializedMeshModel, MeshModel } from '../../../model/core/MeshModel';
import { JsonDefaultItemExporter } from './serializers/JsonDefaultItemExporter';


export class JsonWorldSerializer {
    private defaulSerializer: JsonDefaultItemExporter;

    constructor(defaultSerializer: JsonDefaultItemExporter) {
        this.defaulSerializer = defaultSerializer;
    }

    public export(world: World) {
        const schema: Partial<JsonWorldSchema> = {
            dimensions: world.dimensions.serialize(),
            items: this.serializeItems(world)
        };

        return schema;
    }

    private serializeItems(world: World): SerializedMeshModel[] {
        const items: SerializedMeshModel[] = [];

        [...world.gameObjects]
            .forEach(meshModel => {
                try {
                    const item = this.serializeItem(meshModel);
                    items.push(item);
                } catch (e) {
                    console.error(e);
                }
            });

        return items;
    }

    private serializeItem(meshModel: MeshModel): SerializedMeshModel {
        switch (meshModel.name) {
            case 'wall':
                return meshModel.serialize();
                // return this.defaulSerializer.serialize(meshModel);
            case 'player':
                return this.defaulSerializer.serialize(meshModel);
            case 'floor':
                return this.defaulSerializer.serialize(meshModel);
            case 'cupboard':
                return meshModel.serialize();
            case 'washbasin':
                return meshModel.serialize();
            case 'bathtub':
                return meshModel.serialize();
            case 'bed':
                return meshModel.serialize();
            case 'door':
                return meshModel.serialize();
            case 'table':
                return meshModel.serialize();
            case 'window':
                return meshModel.serialize();
                // return this.defaulSerializer.serialize(meshModel);
            default:
                throw new Error('Can not serialize item with name: ' + meshModel.name);
        }
    }
}
