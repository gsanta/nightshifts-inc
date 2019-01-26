import { WorldMap } from '../../../io/game_map_creator/WorldMap';
import { ItemDeserializer } from './ItemDeserializer';
import { SerializedMeshModel } from '../../../model/core/MeshModel';


export class DeserializerFactory {
    private defaultDeserializer: ItemDeserializer;

    constructor(defaultDeserializer: ItemDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
    }

    public deserialize(serializedMeshModels: SerializedMeshModel[]): WorldMap {

        const meshModels = serializedMeshModels.map(serializedMeshModel => this.defaultDeserializer.createItem(serializedMeshModel));

        const worldMap = new WorldMap();
        worldMap.gameObjects = meshModels;

        return worldMap;
    }
}

// export class UnserializingMeshFactory {
//     public createWall(gameObject: SerializedMeshModel): MeshModel {
//         return this.factories.wall.createItem(gameObject);
//     }

//     public createPlayer(gameObject: GameObject, worldMap: WorldMap): MeshModel {
//         return this.factories.player.createItem(gameObject, worldMap);
//     }

//     public createWindow(gameObject: GameObject): MeshModel {
//         return  this.factories.window.createItem(gameObject);
//     }

//     public createDoor(gameObject: GameObject): MeshModel {
//         return this.factories.door.createItem(gameObject);
//     }

//     public createFloor(gameObject: GameObject): MeshModel {
//         return this.factories.floor.createItem(gameObject);
//     }

//     public createBed(gameObject: GameObject): MeshModel {
//         return this.factories.bed.createItem(gameObject);
//     }

//     public createTable(gameObject: GameObject): MeshModel {
//         return this.factories.table.createItem(gameObject);
//     }

//     public createBathtub(gameObject: GameObject): MeshModel {
//         return this.factories.bathtub.createItem(gameObject);
//     }

//     public createWashbasin(gameObject: GameObject): MeshModel {
//         return this.factories.washbasin.createItem(gameObject);
//     }

//     public createCupboard(gameObject: GameObject): MeshModel {
//         return this.factories.cupboard.createItem(gameObject);
//     }
// }
