import * as BABYLON from 'babylonjs';
import {Vector3} from 'babylonjs';

import { MotionHandler } from './model/MotionHandler';
import { KeyboardHandler } from './model/KeyboardHandler';
import { createScene } from './createScene';
import { Creature } from './model/Creature';
import { createLevel1 } from './level1/createLevel1';
import { CollisionHandler } from './model/CollisionHandler';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
const scene = createScene(engine, canvas);

const field = createLevel1(scene);
const creature = new Creature(scene);

const motionHandler = new MotionHandler(creature);
const keyboardHandler = new KeyboardHandler(motionHandler);
keyboardHandler.subscribe();

let previousTime = Date.now();

const collisionHandler = new CollisionHandler(creature.getBody())

var renderLoop = function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    let previousRotation: BABYLON.Quaternion = null;
    if (creature.getBody().rotationQuaternion) {
        previousRotation = creature.getBody().rotationQuaternion.clone();
    }

    let previousPosition: Vector3 = null;
    if (creature.getBody().absolutePosition) {
        previousPosition = creature.getBody().absolutePosition.clone();
    }

    let delta = new Vector3(0, 0, 0);
    // if (!motionHandler.isIdle()) {
    //     delta = motionHandler.getMoveDelta(elapsedTime);
    //     motionHandler.translate(delta);
    // }
    // motionHandler.rotate(elapsedTime);

    if (!motionHandler.isIdle()) {
        delta = motionHandler.getMoveDelta(elapsedTime);
        motionHandler.translate(delta);
        motionHandler.rotate(elapsedTime);

        for (let i = 0; i < field.walls.length; i++) {
            if (creature.getBody().intersectsMesh(field.walls[i].getBody())) {
                motionHandler.setPosition(previousPosition);
                creature.getBody().rotationQuaternion = previousRotation;

                const adjustedDelta = collisionHandler.getAdjustedPositionDelta(delta, field.walls[i].getBody());
                motionHandler.translate(adjustedDelta);

                break;
            }
        }
    }

    scene.render();
};
engine.runRenderLoop(renderLoop);