import * as BABYLON from 'babylonjs';
import { VectorModel } from './model/core/VectorModel';
import { createLevel1FieldMap } from './levels/createLevel1FieldMap';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas);
engine.enableOfflineSupport = false;

const scene = new BABYLON.Scene(engine);
scene.collisionsEnabled = true;

const fieldMap = createLevel1FieldMap(scene);

let previousTime = Date.now();

var renderLoop = function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - previousTime;
    previousTime = currentTime;
    let delta = new VectorModel(0, 0, 0);

    if (fieldMap.getPlayer().getBody()) {
        fieldMap.getVisibilityDetector().testVisibility(fieldMap.getEnemies()[0]);
    }

    const player = fieldMap.getPlayer();
    if (!fieldMap.getPathFindingStrategy(player).isIdle()) {
        delta = fieldMap.getPathFindingStrategy(player).getNextPosition(elapsedTime);

        let rotation = player.getBody().rotationQuaternion.toEulerAngles().y;
        const verticalDirection = Math.sin(rotation) * delta.z();
        const horizontalDirection = Math.cos(rotation) * delta.z();

        let rotatedDelta = new VectorModel(verticalDirection, 0, horizontalDirection);

        player.setPosition(player.getPosition().add(fieldMap.getCollisionHandler(player).getAdjustedDelta(rotatedDelta)));
    }

    const enemy = fieldMap.getEnemies()[0];
    const enemyDelta = fieldMap.getPathFindingStrategy(enemy).getNextPosition(elapsedTime);

    const adjustedDelta = fieldMap.getCollisionHandler(enemy).getAdjustedDelta(enemyDelta);
    if (adjustedDelta) {
        enemy.setPosition(enemy.getPosition().add(adjustedDelta));
    }

    fieldMap.getPathFindingStrategy(player).rotate(elapsedTime);

    scene.render();
};

engine.runRenderLoop(renderLoop);