import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../world_items/ContainerWorldItem';
import { WorldItem } from '../../world_items/WorldItem';
import { DoubleSidedWorldItem } from '../../world_items/DoubleSidedWorldItem';
import _ = require('lodash');

export class NotActiveRoomStylingActionHandler implements ActionHandler {

    private prevActiveRoom: WorldItem = null;

    public sendAction(type: string, world: World, ...payload: any[]) {

        switch (type) {
            case 'MOVE':
                this.styleItemsInNotActiveRooms(world);
                return;
            default:
                return;
        }
    }

    private styleItemsInNotActiveRooms(world: World) {
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

        // world.nightLight.excludedMeshes = [];

        const intersectingRoom = rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];
        const otherRooms = _.without(rooms, intersectingRoom);

        if (intersectingRoom !== this.prevActiveRoom && intersectingRoom) {
            // intersectingRoom.
            // world.hemisphericLight.setEnabled(false);
            world.hemisphericLight.excludedMeshes.splice(0, 300);
            rooms.forEach(room => {
                if (room === intersectingRoom) {
                    this.setDefaultMaterialForRoom(<ContainerWorldItem> room, world);
                } else {
                    this.setDarkMaterialForRoom(<ContainerWorldItem> room, world);
                }
            });

            // world.hemisphericLight.setEnabled(true);
        }

        this.prevActiveRoom = intersectingRoom;
    }

    private setDarkMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            world.hemisphericLight.excludedMeshes.push(child.mesh);
        });

        room.borderItems.forEach((child: WorldItem) => {
            if (child instanceof DoubleSidedWorldItem) {
                const activeWorldItem = this.getActiveSideOfBorderWorldItem(child, room);
                if (activeWorldItem) {
                    world.hemisphericLight.excludedMeshes.push(child.worldItem1 === activeWorldItem ? child.worldItem2.mesh : child.worldItem1.mesh);
                } else {
                    world.hemisphericLight.excludedMeshes.push(child.worldItem1.mesh);
                    world.hemisphericLight.excludedMeshes.push(child.worldItem2.mesh);
                }
            }
        });
    }

    private getActiveSideOfBorderWorldItem(borderWorldItem: DoubleSidedWorldItem, room: WorldItem): WorldItem {
        const scaling = borderWorldItem.mesh.scaling;

        if (scaling.x > scaling.z) {
            const dist1 = Math.abs(room.mesh.getAbsolutePosition().z - borderWorldItem.worldItem1.mesh.getAbsolutePosition().z);
            const dist2 = Math.abs(room.mesh.getAbsolutePosition().z - borderWorldItem.worldItem2.mesh.getAbsolutePosition().z);
            if (dist1 < dist2) {
                return borderWorldItem.worldItem1;
            } else {
                return borderWorldItem.worldItem2;
            }
        } else {
            const dist1 = Math.abs(room.mesh.getAbsolutePosition().x - borderWorldItem.worldItem1.mesh.getAbsolutePosition().x);
            const dist2 = Math.abs(room.mesh.getAbsolutePosition().x - borderWorldItem.worldItem2.mesh.getAbsolutePosition().x);
            if (dist1 < dist2) {
                return borderWorldItem.worldItem1;
            } else {
                return borderWorldItem.worldItem2;
            }
        }
    }



    private setDefaultMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            // world.nightLight.excludedMeshes.push(child.mesh);
        });
    }
}
