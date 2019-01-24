import { TemplateCreator } from '../TemplateCreator';
import { Scene, StandardMaterial, Mesh } from 'babylonjs';
import { Vector2Model } from '../../../utils/Vector2Model';
import { MeshTemplate } from '../MeshTemplate';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { GameConstants } from '../../../../GameConstants';

const colors = GameConstants.colors;

export class FloorTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private material: StandardMaterial;
    private worldDimensions: Vector2Model;
    private mesh: Mesh;

    constructor(scene: Scene, worldDimensions: Vector2Model) {
        this.scene = scene;
        this.worldDimensions = worldDimensions;

        this.mesh = this.createMesh();
        this.material = this.createMaterial();
    }

    public create(): MeshTemplate {
        this.mesh.material = this.material;
        return new MeshTemplate(null, [this.mesh], [], {...defaultMeshConfig});
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('floorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.floor);

        return material;
    }

    private createMesh(): Mesh {
        return BABYLON.MeshBuilder.CreateGround(
            'floor',
            { width: this.worldDimensions.x(), height: this.worldDimensions.y() },
            this.scene
        );
    }
}