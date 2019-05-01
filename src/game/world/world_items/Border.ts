import { Mesh } from 'babylonjs';
import { WorldItem } from './WorldItem';
import { Polygon } from '@nightshifts.inc/geometry';


export interface Border {
    getSide1BoundingPolygon(): Polygon;
    getSide2BoundingPolygon(): Polygon;
    getSide1Meshes(): Mesh[];
    getSide2Meshes(): Mesh[];
    sides: [WorldItem, WorldItem];
}
