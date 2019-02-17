import { MeshTemplate } from './MeshTemplate';
import { World } from '../../World';

export interface TemplateCreator {
    create(world: World): MeshTemplate;
}
