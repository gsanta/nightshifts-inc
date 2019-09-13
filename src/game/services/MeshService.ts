import { ServiceFacade } from './ServiceFacade';
import { GameObject } from '../model/game_objects/GameObject';
import { Mesh, Vector3 } from 'babylonjs';


export class MeshService {
    private services: ServiceFacade;
    private gameObjectToMeshMap: Map<GameObject, Mesh[]> = new Map();

    constructor(serviceFacade: ServiceFacade) {
        this.services = serviceFacade;
    }

    registerGameObject(gameObject: GameObject, meshes: Mesh[]) {
        this.gameObjectToMeshMap.set(gameObject, meshes);
    }

    getRotation(): Vector3 {
        return null;
    }
}
