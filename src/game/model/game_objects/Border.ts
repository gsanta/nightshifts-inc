import { Room } from './Room';
import { GameObject } from './GameObject';
import { Mesh } from 'babylonjs';

export class Border extends GameObject {
    rooms: Room[] = [];

    sides: [GameObject, GameObject];
}
