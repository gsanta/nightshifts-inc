import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../../engine/world_items/ContainerWorldItem';
import { WorldItem } from '../../world_items/WorldItem';
import { Room } from '../../../engine/world_items/Room';
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

        const intersectingRoom = rooms.filter(room => room.mesh.wrappedMesh.intersectsMesh(world.player.mesh.wrappedMesh))[0];
        const otherRooms = _.without(rooms, intersectingRoom);

        if (intersectingRoom !== this.prevActiveRoom && intersectingRoom) {
            // intersectingRoom.
            // world.hemisphericLight.setEnabled(false);
            world.hemisphericLight.excludedMeshes.splice(0, 300);
            rooms.forEach(room => {
                if (room === intersectingRoom) {
                    this.setDefaultMaterialForRoom(<ContainerWorldItem> room, world);
                } else {
                    this.setDarkMaterialForRoom(<Room> room, world);
                }
            });

            // world.hemisphericLight.setEnabled(true);
        }

        this.prevActiveRoom = intersectingRoom;
    }

    private setDarkMaterialForRoom(room: Room, world: World) {
        world.hemisphericLight.excludedMeshes.push(room.mesh.wrappedMesh);
        room.children.forEach(child => {
            world.hemisphericLight.excludedMeshes.push(child.mesh.wrappedMesh);
        });

        room.borderItems.forEach((child: WorldItem) => {
            if (child instanceof ContainerWorldItem) {
                const activeWorldItem = this.getActiveSideOfBorderWorldItem(child, room);
                if (activeWorldItem) {
                    const mesh = child.children[0] === activeWorldItem ? child.children[0].mesh.wrappedMesh : child.children[1].mesh.wrappedMesh;
                    world.hemisphericLight.excludedMeshes.push(mesh);
                } else {
                    world.hemisphericLight.excludedMeshes.push(child.children[0].mesh.wrappedMesh);
                    world.hemisphericLight.excludedMeshes.push(child.children[1].mesh.wrappedMesh);
                }
            }
        });
    }

    private getActiveSideOfBorderWorldItem(borderWorldItem: ContainerWorldItem, room: WorldItem): WorldItem {
        const scaling = borderWorldItem.mesh.getScale();

        if (scaling.x > scaling.z) {
            const dist1 = Math.abs(room.mesh.getPosition().z - borderWorldItem.children[0].mesh.getPosition().z);
            const dist2 = Math.abs(room.mesh.getPosition().z - borderWorldItem.children[1].mesh.getPosition().z);
            if (dist1 < dist2) {
                return borderWorldItem.children[0];
            } else {
                return borderWorldItem.children[1];
            }
        } else {
            const dist1 = Math.abs(room.mesh.getPosition().x - borderWorldItem.children[0].mesh.getPosition().x);
            const dist2 = Math.abs(room.mesh.getPosition().x - borderWorldItem.children[1].mesh.getPosition().x);
            if (dist1 < dist2) {
                return borderWorldItem.children[0];
            } else {
                return borderWorldItem.children[1];
            }
        }
    }



    private setDefaultMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            // world.nightLight.excludedMeshes.push(child.mesh);
        });
    }
}
