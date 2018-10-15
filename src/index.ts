import * as BABYLON from 'babylonjs';
import {Vector3} from 'babylonjs';

import { MotionHandler } from './model/MotionHandler';
import { KeyboardHandler } from './model/KeyboardHandler';
import { createScene } from './createScene';
import { createLevel1 } from './level1/createLevel1';
import { Enemy } from './model/creature/Enemy';
import { Player } from './model/creature/Player';
import { CollisionHandler } from './model/motion/CollisionHandler';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
const scene = createScene(engine, canvas);

const field = createLevel1(scene);
const creature = new Player(scene);
const enemies = [new Enemy(scene)]

const motionHandler = new MotionHandler(creature);
const keyboardHandler = new KeyboardHandler(motionHandler);
keyboardHandler.subscribe();
const collisionHandler = new CollisionHandler(creature, scene);

let previousTime = Date.now();

var renderLoop = function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    let delta = new Vector3(0, 0, 0);

    if (!motionHandler.isIdle()) {
        delta = motionHandler.getMoveDelta(elapsedTime);

        let rotation = creature.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z;
        const horizontalDirection = Math.cos(rotation) * delta.z;

        let rotatedDelta = new Vector3(verticalDirection, 0, horizontalDirection);

        creature.getBody().setAbsolutePosition(collisionHandler.getAdjustedDelta(rotatedDelta));

    }

    motionHandler.rotate(elapsedTime);

    scene.render();
};

engine.runRenderLoop(renderLoop);