import { Scene, MeshBuilder } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';


export class SimpleMeshCreator {
    private scene: Scene;
    private createBoxFunc: typeof MeshBuilder.CreateBox;

    constructor(scene: Scene, createBoxFunc: typeof MeshBuilder.CreateBox) {
        this.scene = scene;
        this.createBoxFunc = createBoxFunc;
    }

    public createBox(name: string, dimensions: VectorModel) {
        return this.createBoxFunc(
            name,
            {  width: dimensions.x, depth: dimensions.z, height: dimensions.y },
            this.scene
        );
    }
}
