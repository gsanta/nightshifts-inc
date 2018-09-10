// import * as BABYLON from 'babylonjs';
import {Vector3, MeshBuilder} from 'babylonjs';

const width = '1500';
const height = '800';
import { Field } from './model/Field';
import { MotionHandler } from './model/MotionHandler';
import { KeyboardHandler } from './model/KeyboardHandler';

var engine = new BABYLON.Engine(<HTMLCanvasElement> document.getElementById('render-canvas'));

var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8, 1);

const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: 1, height: 80, depth: 1}, scene);
leftWall.position = new Vector3(-40, 0, 0);

const topWall = BABYLON.MeshBuilder.CreateBox("topWall", { width: 80, height: 1, depth: 1}, scene);
topWall.position = new Vector3(0, 40, 0);

const bottomWall = MeshBuilder.CreateBox("bottomWall", { width: 80, height: 1, depth: 1}, scene);
bottomWall.position = new Vector3(0, -40, 0);

const rightWall = MeshBuilder.CreateBox("rightWall", { width: 1, height: 80, depth: 1}, scene);
rightWall.position = new Vector3(40, 0, 0);

const player = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
// const bottom = BABYLON.MeshBuilder.CreateBox("box", { width: 80, height: 1, depth: 1}, scene);
// const leftWall = BABYLON.Mesh.CreateBox("box", { width: 50, height: 1, depth: 1}, scene);
// leftWall.setAbsolutePosition(new BABYLON.Vector3(-4, 0, 0));
// leftWall.position = new BABYLON.Vector3(-4, 0, 0);
// leftWall.translate(BABYLON.Axis.X, 4, BABYLON.Space.WORLD);
const field = new Field();
field.walls = [
    leftWall
]
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -100), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0))
var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);

const motionHandler = new MotionHandler(player, 0.1);
const keyboardHandler = new KeyboardHandler(motionHandler);
keyboardHandler.subscribe();
var renderLoop = function () {
    motionHandler.move();
    scene.render();
};
engine.runRenderLoop(renderLoop);
// var box = BABYLON.Mesh.CreateBox("box", 2, scene);

// box.rotation.x = -0.2;
// box.rotation.y = -0.4;