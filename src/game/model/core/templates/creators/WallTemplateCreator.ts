import { MeshTemplate } from '../MeshTemplate';
import { TemplateCreator } from '../TemplateCreator';
import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { WorldItem } from '../../../../world_items/WorldItem';
const colors = GameConstants.colors;

export class WallTemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.mesh = this.createMesh();
    }

    public create(): WorldItem {
        this.mesh.material = this.material;

        return new WorldItem(this.mesh, 'wall', { ...defaultMeshConfig });
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
