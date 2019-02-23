import { Polygon } from 'game-worldmap-generator';
import { Room } from '../../../../model/creature/type/Room';
import { StandardMaterial, Scene, Vector3 } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { MeshModel } from '../../../../model/core/MeshModel';
const colors = GameConstants.colors;

export class GwmRoomImporter {
    private scene: Scene;
    private material: StandardMaterial;

    constructor(
        scene: Scene
    ) {
        this.scene = scene;
        this.material = this.createMaterial();
    }

    public createItem(polygon: Polygon): Room {
        const positions = polygon.points.map(point => new Vector3(point.x, 1, point.y));

        const room = BABYLON.MeshBuilder.CreatePolygon(
            'room',
            {
                shape: positions,
                depth: 2,
                updatable: true
                },
            this.scene
        );

        room.material = this.material;

        return new MeshModel(room, 'room');
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }
}
