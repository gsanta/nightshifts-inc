import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../../engine/world_items/ContainerWorldItem';
import { WorldItem } from '../../world_items/WorldItem';
import { Room } from '../../../engine/world_items/Room';
import _ = require('lodash');
import { Mesh, Vector3 } from 'babylonjs';
import { DefaultWall } from '../../../engine/world_items/DefaultWall';
import { Door } from '../../model/creature/type/Door';
import { Window } from '../../model/creature/type/Window';
import { Border } from '../../model/creature/type/Border';
import { GameActionType } from '../GameActionType';

export class ActiveRoomLightingActionHandler implements ActionHandler {
    private prevActiveRoom: Room;

    public handle(type: string, world: World, activeRoom: Room) {

        switch (type) {
            case GameActionType.ENTER_ROOM:

                activeRoom.makeActive();

                if (this.prevActiveRoom) {
                    this.prevActiveRoom.makeInactive();
                }

                this.prevActiveRoom = activeRoom;
                return;
            default:
                return;
        }
    }

    private styleItemsInNotActiveRooms(world: World, activeRoom: Room) {
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

        world.hemisphericLight.excludedMeshes.splice(0, 300);
        rooms.forEach(room => {
            if (room !== activeRoom) {
                this.setDarkMaterialForRoom(<Room> room, world);
            }
        });

        world.gameObjects
            .filter(gameObj => gameObj instanceof DefaultWall || gameObj instanceof Door || gameObj instanceof Window).forEach((wall: DefaultWall) => {
            world.hemisphericLight.excludedMeshes.push(...wall.getSide1Meshes());
            world.hemisphericLight.excludedMeshes.push(...wall.getSide2Meshes());
        });

        this.removeWallsOfRoom(<Room> activeRoom, world);

    }

    private removeWallsOfRoom(room: Room, world: World) {
        room.borderItems
            .filter(borderItem => borderItem instanceof DefaultWall || borderItem instanceof Door || borderItem instanceof Window)
            .forEach((child: WorldItem) => {
                this.excludeActiveSideOfWorldItem(<Border> <unknown> child, room, world);
            });
    }

    private setDarkMaterialForRoom(room: Room, world: World) {
        this.addToExcludedMeshesIfNotAdded(room.mesh.wrappedMesh, world);

        room.children.forEach(child => {
            this.addToExcludedMeshesIfNotAdded(child.mesh.wrappedMesh, world);
        });
    }

    private excludeActiveSideOfWorldItem(borderWorldItem: Border, room: WorldItem, world: World) {
        const borderItemBoundingPolygon = borderWorldItem.getSide1BoundingPolygon();
        const boundingPolygon = room.getBoundingPolygon();

        const activeItems: Mesh[] = [];
        if (boundingPolygon.containsMoreThenHalf(borderItemBoundingPolygon)) {
            activeItems.push(...borderWorldItem.getSide1Meshes());
        } else {
            activeItems.push(...borderWorldItem.getSide2Meshes());
        }

        activeItems.forEach(item => {
            const activeSideIndex = world.hemisphericLight.excludedMeshes.indexOf(item);

            if (activeSideIndex !== -1) {
                world.hemisphericLight.excludedMeshes.splice(activeSideIndex, 1);
            }
        });
    }

    private addToExcludedMeshesIfNotAdded(mesh: Mesh, world: World) {
        world.hemisphericLight.excludedMeshes.push(mesh);
    }
}
