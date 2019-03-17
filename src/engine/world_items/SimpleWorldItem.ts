import { MeshWrapper } from '../wrappers/MeshWrapper';
import { StandardMaterial } from 'babylonjs';
import { MeshTemplateConfig } from '../../game/model/core/templates/MeshTemplate';
import { SerializedMeshModel, WorldItem } from '../../game/world_items/WorldItem';


export class SimpleWorldItem<M = any> implements WorldItem {
    public mesh: MeshWrapper<M>;
    public name: string;
    public hasDefaultAction = false;

    public materials: {[key: string]: StandardMaterial} = {};

    protected counter = 1;

    constructor(mesh: MeshWrapper<M>, name: string, config?: MeshTemplateConfig) {
        this.mesh = mesh;
        this.name = name;

        if (config) {
            this.initMesh(config);
        }
    }

    public doDefaultAction() {
        throw new Error('No default action defined');
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.name,
            scaling: {
                x: this.mesh.getScale().x,
                y: this.mesh.getScale().y,
                z: this.mesh.getScale().z,
            },
            translate: {
                x: this.mesh.getPosition().x,
                y: this.mesh.getPosition().y,
                z: this.mesh.getPosition().z
            },
            additionalData: {
                rotation: this.mesh.getRotation().y
            }
        };
    }

    public unserialize(model: SerializedMeshModel): SimpleWorldItem<M> {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.getId()}-${this.counter++}`);
        const name = this.name;

        const clone = new SimpleWorldItem(clonedMesh, name);
        this.copyTo(clone);

        return clone;
    }

    protected copyTo(meshModel: WorldItem): WorldItem {
        meshModel.materials = {...this.materials};
        meshModel.name = this.name;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }

    private initMesh(config: MeshTemplateConfig) {
        this.materials = config.materials;
    }
}
