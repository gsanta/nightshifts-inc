import { Scene, ShadowGenerator } from 'babylonjs';
import { Field } from '../model/Field';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';


export function createLevel1(scene: Scene, shadowGenerator: ShadowGenerator): Field {

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("../models/floor_texture.jpg", scene);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    ground.receiveShadows = true;
    ground.material = groundMaterial;

    const wallMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    const meshFactory = new MeshFactory(scene, wallMaterial, shadowGenerator);
    const field = new Field();
    field.walls = [
        meshFactory.createWall(new VectorModel(-48, 5, 0), new VectorModel(1, 10, 95)),
        meshFactory.createWall(new VectorModel(48, 5, 0), new VectorModel(1, 10, 95)),
        meshFactory.createWall(new VectorModel(0, 5, 48), new VectorModel(95, 10, 1)),
        meshFactory.createWall(new VectorModel(0, 5, -48), new VectorModel(95, 10, 1)),
        meshFactory.createWall(new VectorModel(0, 5, 20), new VectorModel(15, 10, 2)),
        meshFactory.createWall(new VectorModel(-15, 5, -15), new VectorModel(10, 10, 2))
    ];

    return field;
}