import { World } from '../../World';
import { MeshModel } from '../MeshModel';

export abstract class TemplateCreator {
    public abstract create(world: World): MeshModel;
}
