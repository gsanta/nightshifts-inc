import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { Door } from '../../../creature/type/Door';
import { MeshWrapper } from '../../../../../engine/wrappers/MeshWrapper';
import { BabylonMeshWrapper } from '../../../../../engine/wrappers/babylon/BabylonMeshWrapper';
const colors = GameConstants.colors;

export class DoorTemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: MeshWrapper<any>;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.mesh = this.createMesh();
    }

    public create(): Door {
        this.mesh.wrappedMesh.material = this.material;

        return new Door(this.mesh, 'door', {...defaultMeshConfig});
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }

    private createMesh(): MeshWrapper<any> {
        return new BabylonMeshWrapper(MeshBuilder.CreateBox('door-template', { width: 8, depth: 1, height: 5 }, this.scene));
    }
}
