import { Polygon, GwmWorldItem } from 'game-worldmap-generator';
import { Room } from '../../../../model/creature/type/Room';
import { StandardMaterial, Scene, Vector3, Vector2 } from 'babylonjs';
import { GameConstants } from '../../../../GameConstants';
import { MeshModel } from '../../../../model/core/MeshModel';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { World } from '../../../../model/World';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
const colors = GameConstants.colors;

export class GwmRoomImporter {
    private scene: Scene;
    private material: StandardMaterial;
    private worldItemTranslator: WorldItemTranslator;

    constructor(
        scene: Scene,
        worldItemTranslator: WorldItemTranslator
    ) {
        this.scene = scene;
        this.material = this.createMaterial();
        this.worldItemTranslator = worldItemTranslator;
    }

    public createItem(worldItem: GwmWorldItem, world: World): Room {
        let topLeft = new Vector2Model(worldItem.dimensions.points[0].x, worldItem.dimensions.points[0].y);
        const positions = worldItem.dimensions.points.map(point => new Vector3(point.x - topLeft.x(), 2, -(point.y - topLeft.y())));

        // let topLeft = new Vector2Model(positions[0].x, -positions[0].y);
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);
        topLeft = topLeft.add(new Vector2Model(translateX, translateY));

        const translate = new VectorModel(topLeft.x(), 0, -topLeft.y());

        const room = BABYLON.MeshBuilder.CreatePolygon(
            'room',
            {
                shape: positions,
                depth: 2,
                updatable: true
                },
            this.scene
        );

        room.translate(toVector3(translate), 1);

        room.material = this.material;

        return new MeshModel(room, 'room');
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }
}
