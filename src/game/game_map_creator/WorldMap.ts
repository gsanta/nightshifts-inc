import { MeshModel } from '../model/core/MeshModel';
import { Enemy } from '../model/creature/type/Enemy';
import { Player } from '../model/creature/type/Player';
import { LightController } from '../model/light/LightController';
import { HemisphericLight } from 'babylonjs';


export class WorldMap {
    public gameObjects: MeshModel[];
    public floor: MeshModel;
    public enemies: Enemy[] = [];
    public player: Player = null;

    public lightController: LightController;
}
