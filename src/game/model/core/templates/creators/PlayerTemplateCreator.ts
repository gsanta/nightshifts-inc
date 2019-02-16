import { ModelFileBasedTemplateCreator } from './ModelFileBasedTemplateCreator';
import { Scene, Light } from 'babylonjs';
import { MeshConfig } from '../MeshTemplate';
import { Player } from '../../../creature/type/Player';
import { UserInputEventEmitter } from '../../../creature/motion/UserInputEventEmitter';


export class PlayerTemplateCreator extends ModelFileBasedTemplateCreator {
    private light: Light;

    constructor(scene: Scene, base: string, fileName: string, materialFileNames: string[], light: Light, config: Partial<MeshConfig>) {
        super(scene, base, fileName, materialFileNames, config);

        this.light = light;
    }

    public create(): Player {
        if (!this.isAsyncWorkDone) {
            throw new Error(`This is an AsyncTemplateCreator and the async work is not done yet,
                call and wait for doAsyncWork() before calling this method.`);
        }

        this.meshes.forEach(m => m.material = this.materials[0]);

        return new Player(this.config, this.skeletons[0], this.scene, this.light, new UserInputEventEmitter());
    }
}