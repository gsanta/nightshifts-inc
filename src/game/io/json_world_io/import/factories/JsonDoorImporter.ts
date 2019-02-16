
import { ShadowGenerator, Scene } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';
import { GameConstants } from '../../../../GameConstants';
const colors = GameConstants.colors;

export class JsonDoorImporter implements JsonItemImporter {
    private door: Door;
    private shadowGenerator: ShadowGenerator;

    constructor(
        door: Door,
        shadowGenerator: ShadowGenerator
    ) {
        this.door = door;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(serializedMeshModel: SerializedMeshModel): MeshModel {
        const newDoor = this.door.clone();

        newDoor.mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1);

        this.shadowGenerator.getShadowMap().renderList.push(newDoor.mesh);

        newDoor.setPivot(VectorModel.deserialize(serializedMeshModel.additionalData.axis), serializedMeshModel.additionalData.angle);

        return newDoor;
    }
}
