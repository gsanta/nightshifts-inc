import { Scene } from 'babylonjs';
import { Obstacle } from '../model/Obstacle';


export function createLevel1(scene: Scene): Field {
    const obstacle = new Obstacle(1, scene, new Vector3(20, 0, 20));

}