import { WorldItem } from '../world_items/item_types/WorldItem';
import { World } from '../World';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { WorldItemFactory } from './WorldItemFactory';
import { EnemyFactory } from '../world_items/factories/EnemyFactory';
import { Polygon } from '@nightshifts.inc/geometry';
import { WorldItemBoundingBoxCalculator } from './WorldItemBoundingBoxCalculator';
import { WorldItemRotationCalculator } from './WorldItemRotationCalculator';
import { Direction } from '../../model/utils/Direction';

export interface GenericItemImporter<T> {
    createItem(itemInfo: T, world: World): WorldItem;
}

export class WorldFactory {
    private factories: {[key: string]: GenericItemImporter<WorldItemInfo>};
    private worldItemFactoryMap: Map<string, WorldItemFactory>;
    private enemyFactory: EnemyFactory;
    private worldItemBoundingBoxCalculator: WorldItemBoundingBoxCalculator;
    private worldItemRotationCalculator: WorldItemRotationCalculator;

    constructor(
        enemyFactory: EnemyFactory,
        worldItemFactoryMap: Map<string, WorldItemFactory>,
        factories: {[key: string]: GenericItemImporter<WorldItemInfo>},
        worldItemBoundingBoxCalculator: WorldItemBoundingBoxCalculator,
        worldItemRotationCalculator: WorldItemRotationCalculator
    ) {
        this.factories = factories;
        this.worldItemFactoryMap = worldItemFactoryMap;
        this.enemyFactory = enemyFactory;
        this.worldItemBoundingBoxCalculator = worldItemBoundingBoxCalculator;
        this.worldItemRotationCalculator = worldItemRotationCalculator;
    }

    public createWall(itemInfo: WorldItemInfo, world: World): WorldItem {
        return this.factories.wall.createItem(itemInfo, world);
    }

    public createPlayer(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('player');
        const player = this.create(worldItemFactory, itemInfo, world);
        player.hasDefaultAction = false;
        return player;
    }


    public createDoor(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('door');
        const polygon = this.worldItemBoundingBoxCalculator.getBoundingBox(world, itemInfo, null);
        const rotation = this.worldItemRotationCalculator.getRotation(itemInfo);

        return (<any> worldItemFactory).createItem(null, polygon, rotation);
    }

    public createWindow(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('window');
        const mesh = worldItemFactory.meshInfo[0][0]
        // const bed = this.create(worldItemFactory, itemInfo, world);
        const polygon = this.worldItemBoundingBoxCalculator.getBoundingBox(world, itemInfo, mesh);
        const rotation = this.worldItemRotationCalculator.getRotation(itemInfo);
        const door = (worldItemFactory as any).createItem([mesh], polygon, rotation);
        return door;
    }

    public createFloor(itemInfo: WorldItemInfo, world: World): WorldItem {
        return this.worldItemFactoryMap.get('floor').createItem(itemInfo, world);
    }

    public createBed(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('bed');
        const mesh = worldItemFactory.meshInfo[0][0]
        // const bed = this.create(worldItemFactory, itemInfo, world);
        const polygon = this.worldItemBoundingBoxCalculator.getBoundingBox(world, itemInfo, mesh);
        const rotation = this.worldItemRotationCalculator.getRotation(itemInfo);
        const bed = (worldItemFactory as any).createItem([mesh], polygon, rotation);
        bed.hasDefaultAction = false;
        return bed;
    }

    public createTable(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('table');
        return this.create(worldItemFactory, itemInfo, world);
    }

    public createBathtub(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('bathtub');
        return this.create(worldItemFactory, itemInfo, world);
    }

    public createWashbasin(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('washbasin');
        return this.create(worldItemFactory, itemInfo, world);
    }

    public createChair(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('chair');
        return this.create(worldItemFactory, itemInfo, world);
    }

    public createCupboard(itemInfo: WorldItemInfo, world: World): WorldItem {
        const worldItemFactory = this.worldItemFactoryMap.get('cupboard');
        const cupboard = this.create(worldItemFactory, itemInfo, world);
        cupboard.hasDefaultAction = true;

        return cupboard;
    }

    public createRoom(itemInfo: WorldItemInfo, world: World): WorldItem {
        return this.factories.room.createItem(itemInfo, world);
    }

    public createEmptyArea(itemInfo: WorldItemInfo, world: World): WorldItem {
        return this.worldItemFactoryMap.get('empty').createItem(itemInfo, world);
    }

    public createEnemy(polygon: Polygon, world: World): WorldItem {
        return this.enemyFactory.create(polygon, world);
    }

    private create(factory: WorldItemFactory, itemInfo: WorldItemInfo, world: World): WorldItem {
        const meshes = factory.meshInfo[0].map(mesh => mesh.clone(`${factory.meshInfo[0][0].name}`));
        const polygon = this.worldItemBoundingBoxCalculator.getBoundingBox(world, itemInfo, meshes[0]);
        const rotation = this.worldItemRotationCalculator.getRotation(itemInfo);

        return (<any> factory).createItem(meshes, polygon, rotation);
    }
}
