import { WorldItem } from '../world_items/WorldItem';
import { World } from '../World';
import { GwmWorldItem, Polygon } from 'game-worldmap-generator';
import { WorldItemFactory } from './WorldItemFactory';
import { EnemyFactory } from '../world_items/enemy/EnemyFactory';

export interface GenericItemImporter<T> {
    createItem(itemInfo: T, world: World): WorldItem;
}

export class WorldFactory {
    private factories: {[key: string]: GenericItemImporter<GwmWorldItem>};
    private worldItemFactoryMap: Map<string, WorldItemFactory>;
    private enemyFactory: EnemyFactory;

    constructor(
        enemyFactory: EnemyFactory,
        worldItemFactoryMap: Map<string, WorldItemFactory>,
        factories: {[key: string]: GenericItemImporter<GwmWorldItem>}
    ) {
        this.factories = factories;
        this.worldItemFactoryMap = worldItemFactoryMap;
        this.enemyFactory = enemyFactory;
    }

    public createWall(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.wall.createItem(itemInfo, world);
    }

    public createPlayer(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('player').createItem(itemInfo, world);
    }

    public createWindow(itemInfo: GwmWorldItem, world: World): WorldItem {
        return  this.factories.window.createItem(itemInfo, world);
    }

    public createDoor(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.door.createItem(itemInfo, world);
    }

    public createFloor(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('floor').createItem(itemInfo, world);
    }

    public createBed(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('bed').createItem(itemInfo, world);
    }

    public createTable(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('table').createItem(itemInfo, world);
    }

    public createBathtub(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('bathtub').createItem(itemInfo, world);
    }

    public createWashbasin(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('washbasin').createItem(itemInfo, world);
    }

    public createCupboard(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('cupboard').createItem(itemInfo, world);
    }

    public createRoom(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.factories.room.createItem(itemInfo, world);
    }

    public createEmptyArea(itemInfo: GwmWorldItem, world: World): WorldItem {
        return this.worldItemFactoryMap.get('empty').createItem(itemInfo, world);
    }

    public createEnemy(polygon: Polygon, world: World): WorldItem {
        return this.enemyFactory.create(polygon, world);
    }
}
