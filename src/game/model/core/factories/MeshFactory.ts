import { MeshModel } from '../MeshModel';
import { WorldMap } from '../../../io/game_map_creator/WorldMap';
import { GameObject } from 'game-worldmap-generator';
import { ItemFactory } from './ItemFactory';

export class MeshFactory {
    private factories: {[key: string]: ItemFactory};

    constructor(factories: {[key: string]: ItemFactory}) {
        this.factories = factories;
    }

    public createWall(gameObject: GameObject): MeshModel {
        return this.factories.wall.createItem(gameObject);
    }

    public createPlayer(gameObject: GameObject, worldMap: WorldMap): MeshModel {
        return this.factories.player.createItem(gameObject, worldMap);
    }

    public createWindow(gameObject: GameObject): MeshModel {
        return  this.factories.window.createItem(gameObject);
    }

    public createDoor(gameObject: GameObject): MeshModel {
        return this.factories.door.createItem(gameObject);
    }

    public createFloor(gameObject: GameObject): MeshModel {
        return this.factories.floor.createItem(gameObject);
    }

    public createBed(gameObject: GameObject): MeshModel {
        return this.factories.bed.createItem(gameObject);
    }

    public createTable(gameObject: GameObject): MeshModel {
        return this.factories.table.createItem(gameObject);
    }

    public createBathtub(gameObject: GameObject): MeshModel {
        return this.factories.bathtub.createItem(gameObject);
    }

    public createWashbasin(gameObject: GameObject): MeshModel {
        return this.factories.washbasin.createItem(gameObject);
    }

    public createCupboard(gameObject: GameObject): MeshModel {
        return this.factories.cupboard.createItem(gameObject);
    }
}
