import { TemplateCreator } from '../TemplateCreator';
import { Scene, StandardMaterial, Mesh } from 'babylonjs';
import { MeshConfig } from '../MeshTemplate';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { GameConstants } from '../../../../GameConstants';
import { World } from '../../../World';
import { MeshModel } from '../../MeshModel';

const colors = GameConstants.colors;

export class FloorTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.material = this.createMaterial();
    }

    public create(world: World): MeshModel {
        if (!this.mesh) {
            this.mesh = this.createMesh(world);
        }

        const config: MeshConfig = <MeshConfig> {
            name: 'floor',
            mesh: this.mesh,
            materials: {
                default: this.material
            },
            ...defaultMeshConfig
        };

        this.mesh.setEnabled(false);

        return new MeshModel(config);
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('floorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.floor);

        return material;
    }

    private createMesh(world: World): Mesh {
        return BABYLON.MeshBuilder.CreateGround(
            'floor',
            { width: world.dimensions.x(), height: world.dimensions.y(), updatable: true },
            this.scene
        );
    }
}
