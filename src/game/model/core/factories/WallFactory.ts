import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { MeshBuilder, StandardMaterial } from 'babylonjs';
import { MeshModelTemplate } from '../io/MeshModelTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';

export class WallFactory implements ItemFactory {
    private idCounter = 0;
    private material: StandardMaterial;
    private meshModelTemplate: MeshModelTemplate;
    private gameObjectTranslator: GameObjectTranslator;

    constructor(material: StandardMaterial, meshModelTemplate: MeshModelTemplate, gameObjectTranslator: GameObjectTranslator) {
        this.material = material;
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
    }


    public createItem(gameObject: GameObject): MeshModel {

        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate = this.gameObjectTranslator.getTranslate(gameObject).toVector3(scaling.y() / 2);

        const mesh = this.meshModelTemplate.cloneMeshes()[0];
        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.material;
        mesh.receiveShadows = true;

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(mesh);
        }

        meshModel.name = 'wall';

        return Promise.resolve(meshModel);
    }
}