import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../../engine/world_items/ContainerWorldItem';
import { WorldItem } from '../../world_items/WorldItem';
import { Room } from '../../../engine/world_items/Room';
import _ = require('lodash');
import { Mesh, Vector3 } from 'babylonjs';
import { DefaultWall } from '../../../engine/world_items/DefaultWall';

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

            world.gameObjects.filter(gameObj => gameObj instanceof DefaultWall).forEach((wall: DefaultWall) => {
                world.hemisphericLight.excludedMeshes.push(wall.children[0].mesh.wrappedMesh);
                world.hemisphericLight.excludedMeshes.push(wall.children[1].mesh.wrappedMesh);
            });

            // rooms.forEach(room => this.darkenWalls(<Room> room, world));

            this.removeWallsOfRoom(<Room> intersectingRoom, world);

            // world.hemisphericLight.setEnabled(true);
        }

        this.prevActiveRoom = intersectingRoom;
    }

    private removeWallsOfRoom(room: Room, world: World) {
        room.borderItems
            .filter(borderItem => borderItem instanceof DefaultWall)
            .forEach((child: WorldItem) => {
                // if (child instanceof ContainerWorldItem) {

                    const activeSide = this.getActiveSideOfBorderWorldItem(child as any, room);
                    const activeSideIndex = world.hemisphericLight.excludedMeshes.indexOf(activeSide.mesh.wrappedMesh);
                    // const wallSide2Index = world.hemisphericLight.excludedMeshes.indexOf(child.children[1].mesh.wrappedMesh);

                    if (activeSideIndex !== -1) {
                        world.hemisphericLight.excludedMeshes.splice(activeSideIndex, 1);
                    }

                    // if (wallSide2Index !== -1) {
                    //     world.hemisphericLight.excludedMeshes.splice(wallSide2Index, 1);
                    // }
                // }
            });
    }

    private darkenWalls(room: Room, world: World) {
        room.borderItems.forEach((child: WorldItem) => {
            if (child instanceof ContainerWorldItem) {
                this.addToExcludedMeshesIfNotAdded(child.children[0].mesh.wrappedMesh, world);
                this.addToExcludedMeshesIfNotAdded(child.children[1].mesh.wrappedMesh, world);

                // world.hemisphericLight.excludedMeshes.push(child.children[0].mesh.wrappedMesh);
                // world.hemisphericLight.excludedMeshes.push(child.children[1].mesh.wrappedMesh);
                // const activeWorldItem = this.getActiveSideOfBorderWorldItem(child, room);
                // if (activeWorldItem) {
                //     const mesh = child.children[0] === activeWorldItem ? child.children[0].mesh.wrappedMesh : child.children[1].mesh.wrappedMesh;
                //     // world.hemisphericLight.excludedMeshes.push(mesh);
                // } else {
                //     world.hemisphericLight.excludedMeshes.push(child.children[0].mesh.wrappedMesh);
                //     world.hemisphericLight.excludedMeshes.push(child.children[1].mesh.wrappedMesh);
                // }
            }
        });
    }

    private setDarkMaterialForRoom(room: Room, world: World) {
        this.addToExcludedMeshesIfNotAdded(room.mesh.wrappedMesh, world);
        // world.hemisphericLight.excludedMeshes.push(room.mesh.wrappedMesh);
        room.children.forEach(child => {
            this.addToExcludedMeshesIfNotAdded(child.mesh.wrappedMesh, world);

            // world.hemisphericLight.excludedMeshes.push(child.mesh.wrappedMesh);
        });
    }

    private getActiveSideOfBorderWorldItem(borderWorldItem: ContainerWorldItem, room: WorldItem): WorldItem {
        const isHorizontal = borderWorldItem.getRotation().y === 0;
        const scaling = borderWorldItem.children[0].mesh.getScale();

        const boundingSphereCenter: Vector3 = room.mesh.wrappedMesh.getBoundingInfo().boundingSphere.center;
        if (!isHorizontal) {
            const dist1 = Math.abs(boundingSphereCenter.z - borderWorldItem.children[0].mesh.getPosition().z);
            const dist2 = Math.abs(boundingSphereCenter.z - borderWorldItem.children[1].mesh.getPosition().z);
            if (dist1 < dist2) {
                return borderWorldItem.children[0];
            } else {
                return borderWorldItem.children[1];
            }
        } else {
            const dist1 = Math.abs(boundingSphereCenter.x - borderWorldItem.children[0].mesh.getPosition().x);
            const dist2 = Math.abs(boundingSphereCenter.x - borderWorldItem.children[1].mesh.getPosition().x);
            if (dist1 < dist2) {
                return borderWorldItem.children[0];
            } else {
                return borderWorldItem.children[1];
            }
        }
    }

    private addToExcludedMeshesIfNotAdded(mesh: Mesh, world: World) {
        // if (world.hemisphericLight.excludedMeshes.indexOf(mesh) === -1) {
            world.hemisphericLight.excludedMeshes.push(mesh);
        // }
    }



    private setDefaultMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            // world.nightLight.excludedMeshes.push(child.mesh);
        });
    }
}
