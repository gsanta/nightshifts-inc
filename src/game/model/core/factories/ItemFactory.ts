import { MeshModel } from '../MeshModel';
import { GameObject } from 'game-worldmap-generator';
import { WorldMap } from '../../../game_map_creator/WorldMap';

export interface ItemFactory {
    createItem(gameObject: GameObject, worldMap?: WorldMap): MeshModel;
}
