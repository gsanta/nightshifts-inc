import { Mesh } from '@babylonjs/core';
import { WorldItem } from './WorldItem';
import { Polygon } from '@nightshifts.inc/geometry';


export interface Border {
    sides: [WorldItem, WorldItem];
}
