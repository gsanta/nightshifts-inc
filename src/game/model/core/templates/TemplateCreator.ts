import { MeshTemplate } from './MeshTemplate';

export interface TemplateCreator {
    create(): MeshTemplate;
}