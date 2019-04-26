import { WorldItem } from '../../../world_items/WorldItem';
import { World } from '../../World';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ModelFactory } from '../../../io/gwm_world_io/import/factories/ModelFactory';
import { WorldItemFactory } from './WorldItemFactory';

export interface GenericItemImporter<T> {
    createItem(itemInfo: T, world: World): WorldItem;
}

export class MeshFactory {
    private factories: {[key: string]: GenericItemImporter<GwmWorldItem>};
    private worldItemFactoryMap: Map<string, WorldItemFactory>;
    private bedFactory: ModelFactory;

    constructor(worldItemFactoryMap: Map<string, WorldItemFactory>, factories: {[key: string]: GenericItemImporter<GwmWorldItem>}) {
        this.factories = factories;
        this.worldItemFactoryMap = worldItemFactoryMap;
    }

    public createWall(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.wall.createItem(itemInfo, world);
    }

    public createPlayer(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.player.createItem(itemInfo, world);
    }

    public createWindow(itemInfo: GwmWorldItem, world: World): WorldItem {
        return  this.factories.window.createItem(itemInfo, world);
    }

    public createDoor(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.door.createItem(itemInfo, world);
    }

    public createFloor(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.floor.createItem(itemInfo, world);
    }

    public createBed(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('bed').createItem(itemInfo, world);
    }

    public createTable(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.table.createItem(itemInfo, world);
    }

    public createBathtub(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.bathtub.createItem(itemInfo, world);
    }

    public createWashbasin(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.washbasin.createItem(itemInfo, world);
    }

    public createCupboard(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.cupboard.createItem(itemInfo, world);
    }

    public createRoom(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.room.createItem(itemInfo, world);
    }
}
