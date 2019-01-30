import { World } from '../../../model/World';
import { JsonWorldSchema } from '../import/JsonWorldSchema';
import { SerializedMeshModel, MeshModel } from '../../../model/core/MeshModel';
import { JsonDefaultItemSerializer } from './serializers/JsonDefaultItemSerializer';


export class JsonWorldSerializer {
    private defaulSerializer: JsonDefaultItemSerializer;

    constructor(defaultSerializer: JsonDefaultItemSerializer) {
        this.defaulSerializer = defaultSerializer;
    }

    public serialize(world: World) {
        const schema: Partial<JsonWorldSchema> = {
            items: this.serializeItems(world)
        };

        return schema;
    }

    private serializeItems(world: World): SerializedMeshModel[] {
        const items: SerializedMeshModel[] = [];

        [...world.gameObjects, world.player, world.floor]
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
                return this.defaulSerializer.serialize(meshModel);
            case 'player':
                return this.defaulSerializer.serialize(meshModel);
            case 'floor':
                return this.defaulSerializer.serialize(meshModel);
            default:
                throw new Error('Can not serialize item with name: ' + meshModel.name);
        }
    }
}
