import { MeshTemplate } from '../MeshTemplate';
import { TemplateCreator } from '../TemplateCreator';
import { MeshBuilder, Scene, StandardMaterial, Mesh, Vector3, TransformNode } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { defaultMeshConfig } from './ModelFileBasedTemplateCreator';
import { VectorModel } from '../../VectorModel';
const colors = GameConstants.colors;

type NoReadonly<T> = { -readonly [P in keyof T]-?: T[P] };

export class WindowTemplateCreator implements TemplateCreator {
    private scene: Scene;
    private windowGlassMaterial: StandardMaterial;
    private windowFrameMaterial: StandardMaterial;
    private meshes: Mesh[];
    private transformNode: TransformNode;
    private dimensions = new VectorModel(8, 5, 1);

    constructor(scene: Scene) {
        this.scene = scene;

        this.windowGlassMaterial = this.createWindowGlassMaterial();
        this.windowFrameMaterial = this.createWindowFrameMaterial();
        this.meshes = this.createMeshes();
    }

    public create(): MeshTemplate {
        return new MeshTemplate(this.meshes, [], this.windowGlassMaterial, {...defaultMeshConfig});
    }

    private createWindowGlassMaterial(): StandardMaterial {
        const windowGlass = new BABYLON.StandardMaterial('window-glass-material', this.scene);
        windowGlass.diffuseColor = BABYLON.Color3.FromHexString(colors.window);

        return windowGlass;
    }

    private createWindowFrameMaterial(): StandardMaterial {
        const windowFrame = new BABYLON.StandardMaterial('window-frame-material', this.scene);
        windowFrame.diffuseColor = BABYLON.Color3.FromHexString(colors.wall);
        windowFrame.emissiveColor = BABYLON.Color3.FromHexString('#111111');

        return windowFrame;
    }

    private createTransformNode() {
        const transformNode = new BABYLON.TransformNode("window-container");
        this.meshes.forEach(mesh => mesh.parent = transformNode);

        return transformNode;
    }

    private createMeshes(): Mesh[] {
        const width = 8;
        const depth = 1;
        const height = 5;

        const bottom = MeshBuilder.CreateBox(
            'window-bottom',
            { width, depth, height: height / 6 },
            this.scene
        );

        bottom.translate(new Vector3(0, - height / 2 + height / 12, 0), 1);

        // bottom.checkCollisions = true;
        // bottom.isPickable = true;
        // bottom.material = this.materialTemplates.wall;
        // bottom.receiveShadows = true;

        // const isHorizontal = dimensions.x() > dimensions.y();

        let [middle1, middle2] = this.createWindowGlassMeshes();

        const topMesh = MeshBuilder.CreateBox(
            'window-top',
            { width: this.dimensions.x(), depth: this.dimensions.z(), height: this.dimensions.y() / 6 },
            this.scene
        );

        return [bottom, topMesh, middle1, middle2]
    }

    private createWindowGlassMeshes() {
        const middle1 = MeshBuilder.CreateBox(
            'window-middle-left',
            { width: this.dimensions.x() / 2, depth: this.dimensions.z(), height: 4 * this.dimensions.y() / 6 },
            this.scene
        );

        middle1.translate(new Vector3(- this.dimensions.x() / 4, 0, 0), 1);

        // middle1.checkCollisions = true;
        // middle1.isPickable = true;
        middle1.material = this.windowGlassMaterial;
        // middle1.receiveShadows = true;

        const middle2 = MeshBuilder.CreateBox(
            'window-middle-right',
            { width: this.dimensions.x() / 2, depth: this.dimensions.z(), height: 4 * this.dimensions.y() / 6 },
            this.scene
        );

        middle2.translate(new Vector3(+ this.dimensions.x() / 4, 0, 0), 1);

        // middle2.checkCollisions = true;
        // middle2.isPickable = true;
        middle2.material = this.windowGlassMaterial;
        // middle2.receiveShadows = true;

        return [middle1, middle2];
    }
}