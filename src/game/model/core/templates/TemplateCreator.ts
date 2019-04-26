import { MeshTemplate } from './MeshTemplate';
import { World } from '../../../world/World';

export interface TemplateCreator {
    create(world: World): MeshTemplate;
}
