import { ToolMesh } from './ToolMesh';
import { SpotLight, Scene, ShadowGenerator, Vector3, Color3 } from '@babylonjs/core';
import { Player } from '../world/world_items/player/Player';
import { World } from '../world/World';
import { Wall } from '../world/world_items/wall/Wall';
import { Room } from '../world/world_items/room/Room';
import { EmptyArea } from '../world/world_items/empty_area/EmptyArea';
import { Door } from '../world/world_items/door/Door';
import { Window } from '../world/world_items/window/Window';

export class FlashlightToolMesh implements ToolMesh {
    public name = 'flashlight';
    private flashLight: SpotLight;
    private player: Player;

    constructor(scene: Scene, world: World) {
        this.flashLight = this.createFlashLight(scene, world);
        this.player = world.player;
    }

    public enable() {
        this.flashLight.setEnabled(true);
        this.flashLight.parent = this.player.mesh;
    }

    public disable() {
        this.flashLight.setEnabled(false);
        this.flashLight.parent = null;
    }

    private createFlashLight(scene: Scene, world: World) {
        const spotLight = new SpotLight('spot-light', new Vector3(0, 7, 1), new Vector3(0, 0, -5), Math.PI / 4, 3, scene);
        const shadowGenerator = this.createShadowGenerator(spotLight);

        spotLight.diffuse = new Color3(1, 1, 1);
        spotLight.setEnabled(false);


        this.addMeshesToShadowGenerator(shadowGenerator, world);


        return spotLight;
    }

    private createShadowGenerator(spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }

    // TODO refactor this to make it more general
    private addMeshesToShadowGenerator(shadowGenerator: ShadowGenerator, world: World) {
        world.worldItems.filter(worldItem => worldItem instanceof Wall).forEach((wall: Wall) => {
            shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh);
            shadowGenerator.getShadowMap().renderList.push(wall.children[1].mesh);
        });

        world.worldItems.filter(worldItem => worldItem instanceof Room).forEach((room: Room) => {
            shadowGenerator.getShadowMap().renderList.push(room.mesh);
        });

        world.worldItems.filter(worldItem => worldItem instanceof Door).forEach((door: Door) => {
            shadowGenerator.getShadowMap().renderList.push(door.children[0].mesh);
            shadowGenerator.getShadowMap().renderList.push(door.children[1].mesh);
        });

        world.worldItems.filter(worldItem => worldItem instanceof Window).forEach((window: Window) => {
            shadowGenerator.getShadowMap().renderList.push(window.children[0].mesh);
            shadowGenerator.getShadowMap().renderList.push(window.children[1].mesh);
        });

        world.worldItems.filter(worldItem => worldItem instanceof EmptyArea).forEach((emptyArea: EmptyArea) => {
            shadowGenerator.getShadowMap().renderList.push(emptyArea.mesh);
        });
    }
}
