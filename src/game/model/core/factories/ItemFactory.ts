import { MeshModel } from '../MeshModel';
import { GameObject } from 'game-worldmap-generator';

export interface ItemFactory {
    createItem(gameObject: GameObject): MeshModel;
}