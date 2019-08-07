import { GameObject } from './GameObject';
import { Mesh } from '@babylonjs/core';
import { Shape } from '@nightshifts.inc/geometry';
import { Border } from './Border';


export class Room extends GameObject {
    borders: Border[] = [];

    constructor(meshes: Mesh[], boundingBox: Shape) {
        super(meshes, boundingBox, {type: 'room'})
    }
}
