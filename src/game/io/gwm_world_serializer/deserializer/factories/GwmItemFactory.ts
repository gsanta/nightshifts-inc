import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../../../../model/core/MeshModel';
import { World } from '../../../../model/World';
import { GenericItemFactory } from '../../../../model/core/factories/MeshFactory';

export interface GwmItemFactory extends GenericItemFactory<GameObject> {
    createItem(gameObject: GameObject, worldMap?: World): MeshModel;
}
