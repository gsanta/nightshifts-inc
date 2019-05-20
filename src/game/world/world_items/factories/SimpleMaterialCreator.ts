import { Scene, StandardMaterial, Color3 } from '@babylonjs/core';

export class SimpleMaterialCreator {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createMaterialFromHexString(materialName: string, color: string): StandardMaterial {
        const material = new StandardMaterial(materialName, this.scene);
        material.diffuseColor = Color3.FromHexString(color);

        return material;
    }
}
