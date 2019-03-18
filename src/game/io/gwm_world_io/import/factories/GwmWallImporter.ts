import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh, Scene, Vector3 } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';
import { GameConstants } from '../../../../GameConstants';
import { ContainerWorldItem } from '../../../../../engine/world_items/ContainerWorldItem';
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
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y / 2, -translate2.y());

        const wall = <ContainerWorldItem> this.wallTemplate.clone();

        // wall.translate(translate);
        // wall.scale(new VectorModel(scaling.x, scaling.y, scaling.z));

        const material = new BABYLON.StandardMaterial('wallMaterial', this.scene);

        material.diffuseColor = BABYLON.Color3.FromHexString('#'+(Math.random()*0xFFFFFF<<0).toString(16));

        wall.children[0].mesh.wrappedMesh.material = material;

        const material2 = new BABYLON.StandardMaterial('wallMaterial', this.scene);
        material2.diffuseColor = BABYLON.Color3.FromHexString('#'+(Math.random()*0xFFFFFF<<0).toString(16));

        wall.children[1].mesh.wrappedMesh.material = material2;


        if (this.isVerticalWallPiece(scaling)) {
            // const currentPivotPoint0 = wall.children[0].mesh.wrappedMesh.getPivotPoint();
            // wall.children[0].mesh.wrappedMesh.setPivotPoint(new Vector3(-currentPivotPoint0.z, currentPivotPoint0.y, currentPivotPoint0.x));

            // const currentPivotPoint1 = wall.children[1].mesh.wrappedMesh.getPivotPoint();
            // wall.children[1].mesh.wrappedMesh.setPivotPoint(new Vector3(-currentPivotPoint1.z, currentPivotPoint0.y, currentPivotPoint1.x));
            // wall.translate(translate);
            wall.rotateAtCenter(VectorModel.yUint(), Math.PI / 2);
            // wall.scale(new VectorModel(scaling.z, scaling.y, scaling.x));

            // this.verticalWallPieceDimensionsAdjustment(wall.children[0].mesh.wrappedMesh, this.gameObjectToMeshSizeRatio);
            // this.verticalWallPieceDimensionsAdjustment(wall.children[1].mesh.wrappedMesh, this.gameObjectToMeshSizeRatio);

            wall.translate(translate);
            // wall.scale(new VectorModel(scaling.x, scaling.y, scaling.z));
        } else {
            wall.translate(translate);
            // wall.scale(new VectorModel(scaling.x, scaling.y, scaling.z));
        }

        this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh.wrappedMesh);

        return wall;
    }

    private isVerticalWallPiece(vector: VectorModel) {
        return vector.z > vector.x;
    }

    private verticalWallPieceDimensionsAdjustment(mesh: Mesh, gameObjectToMeshSizeRatio: number) {
        mesh.scaling.z = mesh.scaling.z - gameObjectToMeshSizeRatio;
    }
}
