import { Scene, Vector3, ShadowGenerator } from 'babylonjs';
import { MeshModel } from '../model/core/MeshModel';
import { Field } from '../model/Field';


export function createLevel1(scene: Scene, shadowGenerator: ShadowGenerator): Field {

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("../models/floor_texture.jpg", scene);

    // groundMaterial.emissiveColor = new BABYLON.Color3(0.56, 0.41, 0.25);
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    ground.receiveShadows = true;
    ground.material = groundMaterial;

    const wallMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    // wallMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);

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
    shadowGenerator.getShadowMap().renderList.push(field.walls[0].getBody());
    field.walls[1].getBody().isPickable = true;
    field.walls[1].getBody().material = wallMaterial;
    shadowGenerator.getShadowMap().renderList.push(field.walls[1].getBody());
    field.walls[2].getBody().isPickable = true;
    field.walls[2].getBody().material = wallMaterial;
    shadowGenerator.getShadowMap().renderList.push(field.walls[2].getBody());
    field.walls[3].getBody().isPickable = true;
    field.walls[3].getBody().material = wallMaterial;
    shadowGenerator.getShadowMap().renderList.push(field.walls[3].getBody());
    field.walls[4].getBody().isPickable = true;
    field.walls[4].getBody().material = wallMaterial;
    shadowGenerator.getShadowMap().renderList.push(field.walls[4].getBody());

    return field;
}