import { Scene } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { ContainerWorldItem } from '../ContainerWorldItem';
import { Room } from './Room';
import { World } from '../../World';

export class RoomFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): ContainerWorldItem {
        return Room.fromGwmWorldItem(worldItem, this.scene, world);
    }
}
