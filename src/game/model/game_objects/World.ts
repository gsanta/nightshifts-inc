import { FollowCamera, Light, Scene, SpotLight, StandardMaterial, Engine, Mesh, Vector2, PointLight } from 'babylonjs';
import { Tool } from '../../tools/Tool';
import { GameObject } from './GameObject';
import { Room } from './Room';

export interface WorldConfig {
    displayBoundingBoxes: boolean;
}

export class World {

    canvas: HTMLCanvasElement;
    engine: Engine;
    environmentLight: Light;
    roomLight: PointLight;
    dimensions: Vector2;
    worldItems: GameObject[] = [];
    floor: GameObject;
    enemies: GameObject[] = [];
    player: GameObject = null;
    rooms: Room[];

    camera: FollowCamera;

    tools: Tool[];

    materials: {[key: string]: StandardMaterial};
    scene: Scene;

    private meshToGameObjectCache: Map<Mesh, GameObject> = new Map();

    getWorldItemsByType(name: string): GameObject[] {
        return this.worldItems.filter(gameObject => gameObject.type === name);
    }

    getGameObjectForMesh(mesh: Mesh): GameObject {
        if (!this.meshToGameObjectCache.has(mesh)) {
            const gameObject = this.worldItems.find(item => item.meshes ? item.meshes.indexOf(mesh) !== -1 : false);
            this.meshToGameObjectCache.set(mesh, gameObject);
        }

        return this.meshToGameObjectCache.has(mesh) ? this.meshToGameObjectCache.get(mesh) : null;
    }

    config: WorldConfig = {
        displayBoundingBoxes: false
    };
}
