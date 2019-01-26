import { MeshModel } from '../MeshModel';

export interface GenericItemFactory<T> {
    createItem(itemInfo: T): MeshModel;
}

export class AbstractMeshFactory<T> {
    private factories: {[key: string]: GenericItemFactory<T>};

    constructor(factories: {[key: string]: GenericItemFactory<T>}) {
        this.factories = factories;
    }

    public createWall(itemInfo: T): MeshModel {
        return this.factories.wall.createItem(itemInfo);
    }

    public createPlayer(itemInfo: T): MeshModel {
        return this.factories.player.createItem(itemInfo);
    }

    public createWindow(itemInfo: T): MeshModel {
        return  this.factories.window.createItem(itemInfo);
    }

    public createDoor(itemInfo: T): MeshModel {
        return this.factories.door.createItem(itemInfo);
    }

    public createFloor(itemInfo: T): MeshModel {
        return this.factories.floor.createItem(itemInfo);
    }

    public createBed(itemInfo: T): MeshModel {
        return this.factories.bed.createItem(itemInfo);
    }

    public createTable(itemInfo: T): MeshModel {
        return this.factories.table.createItem(itemInfo);
    }

    public createBathtub(itemInfo: T): MeshModel {
        return this.factories.bathtub.createItem(itemInfo);
    }

    public createWashbasin(itemInfo: T): MeshModel {
        return this.factories.washbasin.createItem(itemInfo);
    }

    public createCupboard(itemInfo: T): MeshModel {
        return this.factories.cupboard.createItem(itemInfo);
    }
}
