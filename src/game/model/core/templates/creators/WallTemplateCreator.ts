import { MeshTemplate } from '../MeshTemplate';
import { TemplateCreator } from '../TemplateCreator';
import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
const colors = GameConstants.colors;

export class WallTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.mesh = this.createMesh();
    }

    public create(): MeshTemplate {
        return new MeshTemplate([this.mesh], [], this.material, {...defaultMeshConfig});
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('wallMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.wall);
        material.emissiveColor = BABYLON.Color3.FromHexString('#111111');

        return material;
    }

    private createMesh(): Mesh {
        return MeshBuilder.CreateBox('wall-template', { width: 1, depth: 1, height: 1 }, this.scene);
    }
}