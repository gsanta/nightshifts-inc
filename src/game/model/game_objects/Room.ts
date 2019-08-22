import { GameObject } from './GameObject';
import { Mesh } from 'babylonjs';
import { Shape } from '@nightshifts.inc/geometry';
import { Border } from './Border';


export class Room extends GameObject {
    borders: Border[] = [];
    isActive: boolean;
    lightsWorking: boolean;

    constructor(meshes: Mesh[], boundingBox: Shape) {
        super(meshes, boundingBox, {type: 'room'})
    }


    displayRoof() {
        this.meshes[1].isVisible = true;
    }

    hideRoof() {
        this.meshes[1].isVisible = false;
    }
}
