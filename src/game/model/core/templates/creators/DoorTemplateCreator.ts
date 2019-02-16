import { MeshConfig } from '../MeshTemplate';
import { TemplateCreator } from '../TemplateCreator';
import { MeshBuilder, Scene, StandardMaterial, Mesh } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { MeshModel } from '../../MeshModel';
import { Door } from '../../../creature/type/Door';
const colors = GameConstants.colors;

export class DoorTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private greyScaleMaterial: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
        this.greyScaleMaterial = this.createGreyScaleMaterial();
        this.mesh = this.createMesh();
    }

    public create(): Door {
        this.mesh.material = this.material;

        const config: MeshConfig = {
            mesh: this.mesh,
            materials: {
                default: this.material,
                dark: this.greyScaleMaterial
            },
            ...defaultMeshConfig
        };

        this.mesh.setEnabled(false);

        return new Door(config);
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }

    private createGreyScaleMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('door-greyscale-material', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.doorGreyScale);

        return material;
    }

    private createMesh(): Mesh {
        return MeshBuilder.CreateBox('door-template', { width: 8, depth: 1, height: 5 }, this.scene);
    }
}
