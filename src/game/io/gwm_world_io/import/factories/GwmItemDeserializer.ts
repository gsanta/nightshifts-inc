import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../../../../model/core/MeshModel';
import { World } from '../../../../model/World';
import { GenericItemDeserializer } from '../../../../model/core/factories/MeshFactory';

export interface GwmItemDeserializer extends GenericItemDeserializer<GameObject> {
    createItem(gameObject: GameObject, worldMap?: World): MeshModel;
}
