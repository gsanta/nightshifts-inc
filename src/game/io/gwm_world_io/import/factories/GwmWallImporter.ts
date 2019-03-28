import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem, Rectangle } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh, Scene, Vector3 } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';
import { GameConstants } from '../../../../GameConstants';
import { ContainerWorldItem } from '../../../../../engine/world_items/ContainerWorldItem';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { DefaultWall } from '../../../../../engine/world_items/DefaultWall';
const colors = GameConstants.colors;

export class GwmWallImporter implements GwmItemImporter {
    private wallTemplate: WorldItem;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;
    private scene: Scene;

    constructor(
        wallTemplate: WorldItem,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number,
        scene: Scene
    ) {
        this.wallTemplate = wallTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        // this.makeWallNarrower(worldItem);

        worldItem.dimensions = worldItem.dimensions.translate(new Point(translateX, translateY));
        const dimensions = worldItem.dimensions;
        // .negateY();

        const translate = new VectorModel(dimensions.getBoundingCenter().x, 0, -dimensions.getBoundingCenter().y);

        const wall = <ContainerWorldItem> DefaultWall.fromGwmWorldItem(worldItem, this.scene, world);

        if (this.isVerticalWallPiece(worldItem)) {
            // const dimensions = worldItem.dimensions
            //     .negateY()
            //     .translate(new Point(translateX, -translateY));
            wall.translate(translate);
            // wall.rotateAtCenter(VectorModel.yUint(), Math.PI / 2);
            // wall.scale(new VectorModel(dimensions.height, 5, dimensions.width));
            // wall.children[0].mesh.wrappedMesh.visibility = 0;
            // wall.children[1].mesh.wrappedMesh.visibility = 0;
        } else {
            // const dimensions = worldItem.dimensions
            //     .negateY()
            //     .translate(new Point(translateX, -translateY));
            // wall.scale(new VectorModel(dimensions.width, 5, dimensions.height));
            this.verticalWallPieceDimensionsAdjustment(wall, this.gameObjectToMeshSizeRatio);
            wall.translate(translate);
            // wall.children[0].mesh.wrappedMesh.visibility = 0;
            // wall.children[1].mesh.wrappedMesh.visibility = 0;
        }

        this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh.wrappedMesh);

        return wall;
    }

    private makeWallNarrower(worldItem: GwmWorldItem) {
        const rect = <Rectangle> worldItem.dimensions;
        // return new Vector2Model(rect.width, rect.height);
        if (rect.width > rect.height) {
            const height = worldItem.dimensions.height;
            worldItem.dimensions = worldItem.dimensions
                .setBoundingHeight(1)
                .translate(new Point(0, height / 4));

            // worldItem.dimensions.
            // return new Vector2Model(rect.width * this.gameObjectToMeshSizeRatio, this.gameObjectToMeshSizeRatio);
        } else {
            worldItem.dimensions = worldItem.dimensions.setBoundingWidth(1);

            // return new Vector2Model(this.gameObjectToMeshSizeRatio, rect.height * this.gameObjectToMeshSizeRatio);
        }
    }

    // private getDimensions() {
    //     const rect = worldItem.dimensions;
    //     if (rect.width > rect.height) {
    //         return new Vector2Model(rect.width * this.gameObjectToMeshSizeRatio, this.gameObjectToMeshSizeRatio);
    //     } else {
    //         return new Vector2Model(this.gameObjectToMeshSizeRatio, rect.height * this.gameObjectToMeshSizeRatio);
    //     }
    // }

    private isVerticalWallPiece(worldItem: GwmWorldItem) {
        return worldItem.dimensions.width < worldItem.dimensions.height;
    }


    private verticalWallPieceDimensionsAdjustment(wall: WorldItem, gameObjectToMeshSizeRatio: number) {
        const currentScale = wall.getScale();
        // wall.scale(new VectorModel(currentScale.x, currentScale.y, 0.5));
        // wall.scaling.x = wall.scaling.x - gameObjectToMeshSizeRatio;
    }
}
