// import { SerializedMeshModel } from './SerializedMeshModel';
// import { WorldMap } from '../game_map_creator/WorldMap';
// import { MeshModel } from '../model/core/MeshModel';

// export class WorldDeSerializer {

//     public deserialize(serializedMeshes: SerializedMeshModel[]): WorldMap {

//         serializedMeshes.forEach(serializedMesh => {

//         });

//     }

//     private deserializeMesh(serializedMesh: SerializedMeshModel) {
//         switch (serializedMesh.constructorName) {
//             case MeshModel.name:
//                 new MeshModel()
//             break;
//             default:
//                 throw new Error (`Invalid constructorName for serializedMesh: ${serializedMesh.constructorName}`);
//         }
//     }
// }
