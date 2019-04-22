import { Polygon } from 'game-worldmap-generator';
import { Mesh } from 'babylonjs';
import { WorldItem } from '../../../world_items/WorldItem';


export interface Border {
    getSide1BoundingPolygon(): Polygon;
    getSide2BoundingPolygon(): Polygon;
    getSide1Meshes(): Mesh[];
    getSide2Meshes(): Mesh[];
    sides: [WorldItem, WorldItem];
}
