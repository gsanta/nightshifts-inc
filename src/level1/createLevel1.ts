import { Scene, Vector3 } from 'babylonjs';
import { MeshModel } from '../model/core/MeshModel';
import { Field } from '../model/Field';


export function createLevel1(scene: Scene): Field {

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.56, 0.41, 0.25);
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    ground.material = groundMaterial;

    const wallMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    wallMaterial.emissiveColor = new BABYLON.Color3(0.24, 0.24, 0.23);

    const field = new Field();
    field.walls = [
        MeshModel.createBox(1, scene, new Vector3(-48, 0, 0), new Vector3(1, 3, 95)),
        MeshModel.createBox(2, scene, new Vector3(48, 0, 0), new Vector3(1, 3, 95)),
        MeshModel.createBox(3, scene, new Vector3(0, 0, 48), new Vector3(95, 3, 1)),
        MeshModel.createBox(4, scene, new Vector3(0, 0, -48), new Vector3(95, 3, 1)),
        MeshModel.createBox2(5, scene, new Vector3(0, 0, 20), new Vector3(15, 3, 2))
    ];

    field.walls[0].getBody().isPickable = true;
    field.walls[0].getBody().material = wallMaterial;
    field.walls[1].getBody().isPickable = true;
    field.walls[1].getBody().material = wallMaterial;
    field.walls[2].getBody().isPickable = true;
    field.walls[2].getBody().material = wallMaterial;
    field.walls[3].getBody().isPickable = true;
    field.walls[3].getBody().material = wallMaterial;
    field.walls[4].getBody().isPickable = true;
    field.walls[4].getBody().material = wallMaterial;

    return field;
}