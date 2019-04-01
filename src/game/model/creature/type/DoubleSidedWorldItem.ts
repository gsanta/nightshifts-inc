import { Polygon } from 'game-worldmap-generator';
import { Mesh } from 'babylonjs';


export interface DoubleSidedWorldItem {
    getSide1BoundingPolygon(): Polygon;
    getSide2BoundingPolygon(): Polygon;
    getSide1Meshes(): Mesh[];
    getSide2Meshes(): Mesh[];
}
