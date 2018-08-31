import * as BABYLON from 'babylonjs';
import { Field } from './model/Field';

var engine = new BABYLON.Engine(<HTMLCanvasElement> document.getElementById('render-canvas'));

var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8, 1);

var renderLoop = function () {
    scene.render();
};
engine.runRenderLoop(renderLoop);


const leftWall = BABYLON.Mesh.CreateBox("box", 2, scene);
leftWall.position = new BABYLON.Vector3(-5, 0, 0);
const field = new Field();
field.walls = [
    leftWall
]
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
// var box = BABYLON.Mesh.CreateBox("box", 2, scene);

// box.rotation.x = -0.2;
// box.rotation.y = -0.4;