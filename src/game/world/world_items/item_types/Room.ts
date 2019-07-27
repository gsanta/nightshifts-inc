import { GameObject } from './GameObject';
import { Mesh } from '@babylonjs/core';
import { Shape } from '@nightshifts.inc/geometry';
import { Border } from './Border';


export class Room extends GameObject {
    borders: Border[] = [];

    constructor(mesh: Mesh, boundingBox: Shape) {
        super(mesh, boundingBox, {type: 'room'})
    }
}
