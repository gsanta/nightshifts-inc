import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { SerializedMeshModel, MeshModel } from '../../../model/core/MeshModel';
import { World } from '../../../model/World';
import { AbstractWorldGenerator } from '../../../model/core/factories/AbstractWorldGenerator';
import { Player } from '../../../model/creature/type/Player';


export class JsonWorldGenerator extends AbstractWorldGenerator<SerializedMeshModel> {
    constructor(meshFactory: MeshFactory<SerializedMeshModel>) {
        super(meshFactory);
    }

    public create(serializedMeshModels: SerializedMeshModel[]): World {
        const worldMap = new World();

        const meshes = serializedMeshModels.map(gameObject => this.createMesh(gameObject, worldMap));

        worldMap.gameObjects = meshes.filter(mesh => mesh.name !== 'floor');
        worldMap.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        worldMap.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];

        return worldMap;
    }
}
