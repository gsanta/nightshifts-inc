import * as BABYLON from 'babylonjs';
import {Vector3} from 'babylonjs';

import { ManuallyControlledPathFindingStrategy } from './model/motion/path_finding/ManuallyControlledPathFindingStrategy';
import { KeyboardHandler } from './model/KeyboardHandler';
import { createLevel1 } from './level1/createLevel1';
import { Enemy } from './model/creature/Enemy';
import { Player } from './model/creature/Player';
import { CollisionHandler } from './model/motion/CollisionHandler';
import { VectorModel } from './model/core/VectorModel';
import { AutomaticPathFindingStartegy } from './model/motion/path_finding/AutomaticPathFindingStrategy';
import { SceneModel } from './model/core/SceneModel';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
engine.enableOfflineSupport = false;

const scene = new BABYLON.Scene(engine);
scene.collisionsEnabled = true;
var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
light.diffuse = new BABYLON.Color3(0.27, 0.37, 0.41);
// light.diffuse = new BABYLON.Color3(0, 0, 0);
// light.isEnabled(false);
// light.specular = new BABYLON.Color3(0, 0, 0);
// light.specular = null;
const sceneModel = new SceneModel(scene);

new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);

const spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 5, 1), new BABYLON.Vector3(0, -1, 5), Math.PI / 4, 1, scene);
spotLight.diffuse = new BABYLON.Color3(1, 1, 0.6);
spotLight.specular = new BABYLON.Color3(1, 1, 0.6);


var shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
shadowGenerator.usePoissonSampling = true;

const field = createLevel1(scene, shadowGenerator);
const creature = new Player(scene, spotLight);
const enemies = [new Enemy(scene)]

const motionHandler = new ManuallyControlledPathFindingStrategy(creature);
const automaticPathFindingStrategy = new AutomaticPathFindingStartegy(enemies[0], sceneModel, field.walls);
const keyboardHandler = new KeyboardHandler(motionHandler);
keyboardHandler.subscribe();
const collisionHandler = new CollisionHandler(creature, scene);
const enemyCollisionHandler = new CollisionHandler(enemies[0], scene);

let previousTime = Date.now();

var renderLoop = function () {

    const currentTime = Date.now();
    const elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    let delta = new VectorModel(0, 0, 0);

    if (!motionHandler.isIdle()) {
        delta = motionHandler.getNextPosition(elapsedTime);

        let rotation = creature.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z();
        const horizontalDirection = Math.cos(rotation) * delta.z();

        let rotatedDelta = new VectorModel(verticalDirection, 0, horizontalDirection);

        creature.setPosition(creature.getPosition().add(collisionHandler.getAdjustedDelta(rotatedDelta)));
    }

    const enemyDelta = automaticPathFindingStrategy.getNextPosition(elapsedTime);
    enemies[0].setPosition(enemies[0].getPosition().add(enemyCollisionHandler.getAdjustedDelta(enemyDelta)));

    motionHandler.rotate(elapsedTime);

    scene.render();
};

engine.runRenderLoop(renderLoop);