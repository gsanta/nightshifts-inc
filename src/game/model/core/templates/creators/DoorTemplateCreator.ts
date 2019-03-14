import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { Door } from '../../../creature/type/Door';
const colors = GameConstants.colors;

export class DoorTemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.mesh = this.createMesh();
    }

    public create(): Door {
        this.mesh.material = this.material;

        return new Door(this.mesh, 'door', {...defaultMeshConfig});
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }

    private createMesh(): Mesh {
        return MeshBuilder.CreateBox('door-template', { width: 8, depth: 1, height: 5 }, this.scene);
    }
}
