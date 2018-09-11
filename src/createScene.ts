import { Engine, Vector3, MeshBuilder } from "babylonjs";
import { Field } from "./model/Field";

export const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

	//Light direction is directly down from a position one unit up, slow decay
	var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-1, 1, -1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	light.specular = new BABYLON.Color3(0, 1, 0);

	//Light direction is directly down from a position one unit up, fast decay
	var light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 50, scene);
	light1.diffuse = new BABYLON.Color3(0, 1, 0);
	light1.specular = new BABYLON.Color3(0, 1, 0);

	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);

    return scene;
};

// export const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
//     var scene = new BABYLON.Scene(engine);
//     scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8, 1);

//     const floor = BABYLON.MeshBuilder.CreateBox("floor", { width: 80, height: 80, depth: 1}, scene);

//     const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: 1, height: 80, depth: 1}, scene);
//     leftWall.position = new Vector3(-40, 0, 0);

//     const topWall = BABYLON.MeshBuilder.CreateBox("topWall", { width: 80, height: 1, depth: 1}, scene);
//     topWall.position = new Vector3(0, 40, 0);

//     const bottomWall = MeshBuilder.CreateBox("bottomWall", { width: 80, height: 1, depth: 1}, scene);
//     bottomWall.position = new Vector3(0, -40, 0);

//     const rightWall = MeshBuilder.CreateBox("rightWall", { width: 1, height: 80, depth: 1}, scene);
//     rightWall.position = new Vector3(40, 0, 0);

//     const player = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);

//     const field = new Field();
//     field.walls = [
//         leftWall
//     ]
//     var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -100), scene);
//     camera.setTarget(new BABYLON.Vector3(0, 0, 0))

//     var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-1, 1, -1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);
//     light.diffuse = new BABYLON.Color3(1, 0, 0);
//     light.specular = new BABYLON.Color3(0, 1, 0);
// }