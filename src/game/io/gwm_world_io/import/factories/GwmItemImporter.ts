import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../../../../model/core/MeshModel';
import { World } from '../../../../model/World';
import { GenericItemImporter } from '../../../../model/core/factories/MeshFactory';

export interface GwmItemImporter extends GenericItemImporter<GameObject> {
    createItem(gameObject: GameObject, worldMap?: World): MeshModel;
}
