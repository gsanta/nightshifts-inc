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

    if (!motionHandler.isIdle() && creature.getBody().rotationQuaternion) {
        delta = motionHandler.getMoveDelta(elapsedTime);

        let rotation = creature.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z;
        const horizontalDirection = Math.cos(rotation) * delta.z;

        let rotatedDelta = new Vector3(verticalDirection, 0, horizontalDirection);

        const pickingInfo = castRay(previousPosition, rotatedDelta);

        if (pickingInfo.pickedMesh) {
            if (pickingInfo.pickedMesh.name !== 'ray') {
                let invNormal = pickingInfo.getNormal().negate();
                invNormal = invNormal.scale(rotatedDelta.multiply(pickingInfo.getNormal()).length()); // Change normal to direction's length and normal's axis
                let wallDir = rotatedDelta.subtract(invNormal);

                // let projected = pickingInfo.getNormal().clone().scale((Vector3.Dot(rotatedDelta, pickingInfo.getNormal())));

                // rotatedDelta = rotatedDelta.subtract(projected).negate();

                const newPos = creature.getBody().position.add(wallDir);
                creature.getBody().setAbsolutePosition(newPos);
                1
                // var m = new BABYLON.Matrix();
                // // creature.getBody().rotationQuaternion.toRotationMatrix(m);
                // creature.getBody().getWorldMatrix().invertToRef(m);
                // var v2 = BABYLON.Vector3.TransformCoordinates(wallDir, m);
                // motionHandler.translate(v2);
            }
        } else {
            console.log('wrong branch')

            motionHandler.translate(delta);
        }


        // for (let i = 0; i < field.walls.length; i++) {
        //     if (creature.getBody().intersectsMesh(field.walls[i].getBody())) {
        //         motionHandler.setPosition(previousPosition);
        //         creature.getBody().rotationQuaternion = previousRotation;

        //         const adjustedDelta = collisionHandler.getAdjustedPositionDelta(delta, field.walls[i].getBody());
        //         motionHandler.translate(adjustedDelta);

        //         break;
        //     }
        // }
    }

    motionHandler.rotate(elapsedTime);

    scene.render();
};

function vecToLocal(vector, mesh){
    var m = mesh.getWorldMatrix();
    var v = BABYLON.Vector3.TransformCoordinates(vector, m);
    return v;		 
}

let prevRayHelper: BABYLON.RayHelper = null;

function castRay(currentPos: BABYLON.Vector3, delta: BABYLON.Vector3):  BABYLON.PickingInfo {
    var origin = currentPos.clone();
    origin.y += 1;

    var forward = new BABYLON.Vector3(0,1,1);
    forward = vecToLocal(forward, creature.getBody());

    var ray = new BABYLON.Ray(origin, delta, 30);

    let rayHelper = new BABYLON.RayHelper(ray);
    rayHelper.show(scene, new BABYLON.Color3(0.5, 0.5, 0.5));

    var hit = scene.pickWithRay(ray, null);

    if (prevRayHelper) {
        prevRayHelper.dispose();
    }

    prevRayHelper = rayHelper;

    if (hit.pickedMesh) {
        // console.log('name: ' + hit.pickedMesh.name + ', ' + hit.getNormal());
    }
    return hit;
}

engine.runRenderLoop(renderLoop);