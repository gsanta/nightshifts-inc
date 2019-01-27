import { MeshModel } from './core/MeshModel';
import { Enemy } from './creature/type/Enemy';
import { Player } from './creature/type/Player';
import { LightController } from './light/LightController';


export class World {
    public gameObjects: MeshModel[];
    public floor: MeshModel;
    public enemies: Enemy[] = [];
    public player: Player = null;

    public lightController: LightController;
}
