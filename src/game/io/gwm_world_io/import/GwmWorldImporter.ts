import { World } from '../../../model/World';
import { WorldMapParser, WorldItem } from 'game-worldmap-generator';
import { Player } from '../../../model/creature/type/Player';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { AdditionalData, parseJsonAdditionalData } from './AdditionalData';
import { MeshFactory } from '../../../model/core/factories/MeshFactory';
import { Promise } from 'es6-promise';
import { Scene } from 'babylonjs';
import { AbstractMeshFactoryProducer } from '../../../model/core/factories/AbstractMeshFactoryProducer';
import { LightController } from '../../../model/light/LightController';
import { AbstractWorldImporter } from '../../../model/core/factories/AbstractWorldImporter';

export class GwmWorldImporter extends AbstractWorldImporter<WorldItem> {
    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<WorldItem>) {
        super(scene, canvas, meshFactoryProducer);
    }

    public create(strWorld: string): Promise<World> {
        const worldParsingResult = new WorldMapParser().parse<AdditionalData>(strWorld, parseJsonAdditionalData);
        const worldItems = worldParsingResult.items;

        const world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = this.getWorldDimensions(worldItems);
        world.camera = this.camera;

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.setMeshes(worldItems, meshFactory, world);

                return world;
            });
    }

    protected setMeshes(worldItems: WorldItem[], meshFactory: MeshFactory<WorldItem>, world: World): void {
        const meshes = worldItems.map(gameObject => this.createMesh(gameObject, meshFactory, world));

        world.gameObjects = meshes;
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }

    private getWorldDimensions(gameObjects: WorldItem[]): Vector2Model {
        const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

        return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
    }
}
