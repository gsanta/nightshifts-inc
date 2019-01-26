import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../../../../model/core/MeshModel';
import { WorldMap } from '../../WorldMap';

export interface ItemFactory {
    createItem(gameObject: GameObject, worldMap?: WorldMap): MeshModel;
}
