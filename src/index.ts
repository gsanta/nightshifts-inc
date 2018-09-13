import * as BABYLON from 'babylonjs';
import {Vector3, MeshBuilder} from 'babylonjs';

const width = '1500';
const height = '800';
import { Field } from './model/Field';
import { MotionHandler } from './model/MotionHandler';
import { KeyboardHandler } from './model/KeyboardHandler';
import { createScene } from './createScene';
import { Creature } from './model/Creature';
import { Obstacle } from './model/Obstacle';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
const scene = createScene(engine, canvas);

// var redMat = new BABYLON.StandardMaterial("redMat", scene);
// redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
// const player = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
// player.material = redMat;
const obstacle = new Obstacle(1, scene);
const creature = new Creature(scene);

const motionHandler = new MotionHandler(creature, 0.1);
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