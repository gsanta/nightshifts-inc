import { Scene, Vector3 } from 'babylonjs';
import { Obstacle } from '../model/Obstacle';
import { Field } from '../model/Field';


export function createLevel1(scene: Scene): Field {
    const field = new Field();
    field.walls = [
        new Obstacle(1, scene, new Vector3(-48, 0, 0), new Vector3(1, 2, 95)),
        new Obstacle(2, scene, new Vector3(48, 0, 0), new Vector3(1, 2, 95)),
        new Obstacle(3, scene, new Vector3(0, 0, 48), new Vector3(95, 2, 1)),
        new Obstacle(4, scene, new Vector3(0, 0, -48), new Vector3(95, 2, 1)),
    ];

    return field;
}