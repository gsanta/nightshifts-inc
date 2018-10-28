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
import { SceneModel, Rectangle } from './model/core/SceneModel';
import { EnemyVisibilityDetector } from './model/motion/EnemyVisibilityDetector';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
engine.enableOfflineSupport = false;

const scene = new BABYLON.Scene(engine);
scene.collisionsEnabled = true;


new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);

let previousTime = Date.now();

var renderLoop = function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - previousTime;
    previousTime = currentTime;
    let delta = new VectorModel(0, 0, 0);

    if (player.getBody()) {
        enemyVisibilityDetector.testVisibility(enemies[0]);
    }

    if (!motionHandler.isIdle()) {
        delta = motionHandler.getNextPosition(elapsedTime);

        let rotation = player.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z();
        const horizontalDirection = Math.cos(rotation) * delta.z();

        let rotatedDelta = new VectorModel(verticalDirection, 0, horizontalDirection);

        player.setPosition(player.getPosition().add(collisionHandler.getAdjustedDelta(rotatedDelta)));
    }

    const enemyDelta = automaticPathFindingStrategy.getNextPosition(elapsedTime);

    const adjustedDelta = enemyCollisionHandler.getAdjustedDelta(enemyDelta);
    if (adjustedDelta) {
        enemies[0].setPosition(enemies[0].getPosition().add(adjustedDelta));
    }

    motionHandler.rotate(elapsedTime);

    scene.render();
};

engine.runRenderLoop(renderLoop);