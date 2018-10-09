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
import { createLevel1 } from './level1/createLevel1';
import { CollisionHandler } from './model/CollisionHandler';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
const scene = createScene(engine, canvas);

// var redMat = new BABYLON.StandardMaterial("redMat", scene);
// redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
// const player = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
// player.material = redMat;
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

    // const prevMatrix = creature.getBody().getWorldMatrix().clone();
    let delta = new Vector3(0, 0, 0);
    if (motionHandler.shouldMove()) {
        delta = motionHandler.getMoveDelta(elapsedTime);
        motionHandler.translate(delta);
    }
    motionHandler.rotate(elapsedTime);
    // if (creature.getBody().rotationQuaternion) {
    //     console.log(creature.getBody().rotationQuaternion.toEulerAngles())
    // }
    let intersects = false;
    console.log(creature.getBody().getAbsolutePosition().x)
    // console.log((<any>motionHandler).directions.length)
    if (!motionHandler.isIdle()) {
        for (let i = 0; i < field.walls.length; i++) {
            if (creature.getBody().intersectsMesh(field.walls[i].getBody())) {
                motionHandler.setPosition(previousPosition);
                creature.getBody().rotationQuaternion = previousRotation;

                const adjustedDelta = collisionHandler.getAdjustedPositionDelta(delta, field.walls[i].getBody());
                motionHandler.translate(adjustedDelta);

                break;
                intersects = true;
            }
        }
    }

    if (intersects) {
        // console.log('intersection')
        // motionHandler.setPosition(previousPosition);
        // creature.getBody().rotationQuaternion = previousRotation;
        // creature.getBody()._worldMatrix = prevMatrix;
    }

    scene.render();
};
engine.runRenderLoop(renderLoop);
// var box = BABYLON.Mesh.CreateBox("box", 2, scene);

// box.rotation.x = -0.2;
// box.rotation.y = -0.4;