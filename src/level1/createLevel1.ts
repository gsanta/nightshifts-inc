import { Scene, Vector3 } from 'babylonjs';
import { Obstacle } from '../model/Obstacle';
import { Field } from '../model/Field';


export function createLevel1(scene: Scene): Field {
    const field = new Field();
    field.walls = [
        Obstacle.createBox(1, scene, new Vector3(-48, 0, 0), new Vector3(1, 3, 95)),
        Obstacle.createBox(2, scene, new Vector3(48, 0, 0), new Vector3(1, 3, 95)),
        Obstacle.createBox(3, scene, new Vector3(0, 0, 48), new Vector3(95, 3, 1)),
        Obstacle.createBox(4, scene, new Vector3(0, 0, -48), new Vector3(95, 3, 1)),
        Obstacle.createBox2(5, scene, new Vector3(0, 0, 20), new Vector3(15, 3, 2))
    ];

    field.walls[0].getBody().isPickable = true;
    field.walls[1].getBody().isPickable = true;
    field.walls[2].getBody().isPickable = true;
    field.walls[3].getBody().isPickable = true;
    field.walls[4].getBody().isPickable = true;

    return field;
}