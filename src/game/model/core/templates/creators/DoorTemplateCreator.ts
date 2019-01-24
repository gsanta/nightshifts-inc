import { MeshTemplate } from '../MeshTemplate';
import { TemplateCreator } from '../TemplateCreator';
import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { timingSafeEqual } from 'crypto';
const colors = GameConstants.colors;

export class DoorTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.mesh = this.createMesh();
    }

    public create(): MeshTemplate {
        this.mesh.material = this.material;
        return new MeshTemplate(null, [this.mesh], [], {...defaultMeshConfig});
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = new BABYLON.Color3(colors.door.r, colors.door.g, colors.door.b);

        return material;
    }

    private createMesh(): Mesh {
        return MeshBuilder.CreateBox('door-template', { width: 8, depth: 1, height: 5 }, this.scene);
    }
}
