import { WorldItem } from '../../../world_items/WorldItem';
import { World } from '../../World';
import { Polygon, GwmWorldItem } from 'game-worldmap-generator';
import { Mesh } from 'babylonjs';
import { ModelFactory } from '../../../io/gwm_world_io/import/factories/ModelFactory';
import { WorldItemFactory } from './WorldItemFactory';

export interface GenericItemImporter<T> {
    createItem(itemInfo: T, world: World): WorldItem;
}

export class MeshFactory<T> {
    private factories: {[key: string]: GenericItemImporter<T>};
    private worldItemFactoryMap: Map<string, WorldItemFactory>;
    private bedFactory: ModelFactory;

    constructor(worldItemFactoryMap: Map<string, WorldItemFactory>, factories: {[key: string]: GenericItemImporter<T>}) {
        this.factories = factories;
        this.worldItemFactoryMap = worldItemFactoryMap;
    }

    public createWall(itemInfo: T, world: World): WorldItem {
        return this.factories.wall.createItem(itemInfo, world);
    }

    public createPlayer(itemInfo: T, world: World): WorldItem {
        return this.factories.player.createItem(itemInfo, world);
    }

    public createWindow(itemInfo: T, world: World): WorldItem {
        return  this.factories.window.createItem(itemInfo, world);
    }

    public createDoor(itemInfo: T, world: World): WorldItem {
        return this.factories.door.createItem(itemInfo, world);
    }

    public createFloor(itemInfo: T, world: World): WorldItem {
        return this.factories.floor.createItem(itemInfo, world);
    }

    public createBed(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('bed').createItem(itemInfo, world);
    }

    public createTable(itemInfo: T, world: World): WorldItem {
        return this.factories.table.createItem(itemInfo, world);
    }

    public createBathtub(itemInfo: T, world: World): WorldItem {
        return this.factories.bathtub.createItem(itemInfo, world);
    }

    public createWashbasin(itemInfo: T, world: World): WorldItem {
        return this.factories.washbasin.createItem(itemInfo, world);
    }

    public createCupboard(itemInfo: T, world: World): WorldItem {
        return this.factories.cupboard.createItem(itemInfo, world);
    }

    public createRoom(itemInfo: T, world: World): WorldItem {
        return this.factories.room.createItem(itemInfo, world);
    }
}
